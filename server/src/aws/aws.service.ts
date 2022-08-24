import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
@Injectable()
export class AwsService {
  constructor(private readonly configService: ConfigService) {}

  async getSignedUrlForImageUpload() {
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY'
    );
    const region = this.configService.get<string>('AWS_REGION');
    const bucketName = this.configService.get<string>('AWS_BUCKET');
    const fileName = new Date().getTime().toString();

    AWS.config.update({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const s3 = new AWS.S3();
    const params = { Bucket: bucketName, Key: fileName, Expires: 100 };
    const signedUrl = await s3.getSignedUrlPromise('putObject', params);
    return { signedUrl, fileName };
  }

  getSignedUrlForImageRemove() {
    return;
  }
}
