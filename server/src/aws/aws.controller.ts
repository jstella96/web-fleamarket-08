import { Controller, Get } from '@nestjs/common';
import { AwsService } from './aws.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('aws')
@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Get('/signed-url')
  async getSignedUrlForProductImage() {
    return this.awsService.getSignedUrlForImageUpload();
  }
}
