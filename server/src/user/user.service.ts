import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserRegionDto } from './dto/create-user-region.dto';
import { UserRegion } from './entities/user-region.entity';
import { User } from './entities/user.entity';

const MIN_REGION_COUNT = 1;
const MAX_REGION_COUNT = 2;

@Injectable()
export class UserService {
  async findUser(userId: number) {
    const user = await User.findOne({
      where: { id: userId },
      relations: { userRegions: { region: true } },
    });
    return user;
  }

  async createRegion(
    @Body() createUserRegionDto: CreateUserRegionDto,
    userId: number
  ) {
    const { regionCode: regionCode } = createUserRegionDto;
    const values = { userId, regionCode, isPrimary: true };
    console.log(userId);
    const userRegion = await UserRegion.findOneBy({
      userId: userId,
      regionCode,
    });
    console.log(userRegion);
    if (userRegion) {
      throw new HttpException(
        `이미 존재하는 동네입니다.`,
        HttpStatus.METHOD_NOT_ALLOWED
      );
    }
    const userRegionsCount = await UserRegion.countBy({ userId });
    if (userRegionsCount >= MAX_REGION_COUNT) {
      throw new HttpException(
        `동네는 최대 ${MAX_REGION_COUNT}개만 설정할 수 있습니다.`,
        HttpStatus.METHOD_NOT_ALLOWED
      );
    }

    await UserRegion.updateAllPrimaryRegion(userId, false);

    await UserRegion.createQueryBuilder()
      .insert()
      .into(UserRegion)
      .values(values)
      .execute();

    return values;
  }

  async deleteRegion(regionCode: number, userId: number) {
    const userRegionsCount = await UserRegion.countBy({ userId });
    if (userRegionsCount <= MIN_REGION_COUNT) {
      throw new HttpException(
        `동네는 최소 ${MIN_REGION_COUNT}개 이상 존재해야 합니다.`,
        HttpStatus.METHOD_NOT_ALLOWED
      );
    }

    const result = await UserRegion.createQueryBuilder()
      .delete()
      .from(UserRegion)
      .where('user_id = :userId and region_code = :regionCode', {
        userId,
        regionCode,
      })
      .execute();

    await UserRegion.updateAllPrimaryRegion(userId, true);

    return result;
  }

  async setRegionPrimary(regionCode: number, userId: number) {
    await UserRegion.updateAllPrimaryRegion(userId, false);

    return await UserRegion.createQueryBuilder()
      .update()
      .set({ isPrimary: true })
      .where('user_id = :userId and region_code = :regionCode', {
        userId,
        regionCode,
      })
      .execute();
  }
}
