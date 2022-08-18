import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserRegionDto } from './dto/create-user-region.dto';
import { UserRegion } from './entities/user-region.entity';

const MIN_REGION_COUNT = 1;
const MAX_REGION_COUNT = 2;

@Injectable()
export class UserService {
  async createRegion(@Body() createUserRegionDto: CreateUserRegionDto) {
    const { regionCode: region_code } = createUserRegionDto;
    // FIXME: 실제 유저 id로 변경
    const user_id = 76844355;
    const values = { user_id, region_code, isPrimary: true };

    const userRegion = await UserRegion.findOneBy({ user_id, region_code });
    if (userRegion) {
      throw new HttpException(
        `이미 존재하는 동네입니다.`,
        HttpStatus.METHOD_NOT_ALLOWED
      );
    }

    const userRegionsCount = await UserRegion.countBy({ user_id });
    if (userRegionsCount >= MAX_REGION_COUNT) {
      throw new HttpException(
        `동네는 최대 ${MAX_REGION_COUNT}개만 설정할 수 있습니다.`,
        HttpStatus.METHOD_NOT_ALLOWED
      );
    }

    await UserRegion.updateAllPrimaryRegion(user_id, false);

    await UserRegion.createQueryBuilder()
      .insert()
      .into(UserRegion)
      .values(values)
      .execute();

    return values;
  }

  async deleteRegion(regionCode: number) {
    // FIXME: 실제 유저 id로 변경
    const user_id = 76844355;

    const userRegionsCount = await UserRegion.countBy({ user_id });
    if (userRegionsCount <= MIN_REGION_COUNT) {
      throw new HttpException(
        `동네는 최소 ${MIN_REGION_COUNT}개 이상 존재해야 합니다.`,
        HttpStatus.METHOD_NOT_ALLOWED
      );
    }

    const result = await UserRegion.createQueryBuilder()
      .delete()
      .from(UserRegion)
      .where('user_id = :user_id and region_code = :regionCode', {
        user_id,
        regionCode,
      })
      .execute();

    await UserRegion.updateAllPrimaryRegion(user_id, true);

    return result;
  }

  async setRegionPrimary(regionCode: number) {
    // FIXME: 실제 유저 id로 변경
    const user_id = 76844355;

    await UserRegion.updateAllPrimaryRegion(user_id, false);

    return await UserRegion.createQueryBuilder()
      .update()
      .set({ isPrimary: true })
      .where('user_id = :user_id and region_code = :regionCode', {
        user_id,
        regionCode,
      })
      .execute();
  }
}
