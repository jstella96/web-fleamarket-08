import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRegionDto {
  @ApiProperty()
  regionCode: number;
}
