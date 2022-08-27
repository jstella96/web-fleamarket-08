import { Body, Controller, Get, Post } from '@nestjs/common';
import { AwsService } from './aws.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('aws')
@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post('/signed-url')
  async getSignedUrlForProductImage(
    @Body()
    fileNemes: string[]
  ) {
    return this.awsService.getSignedUrlForImageUpload(fileNemes);
  }
}
