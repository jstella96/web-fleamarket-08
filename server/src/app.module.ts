import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CategoryModule } from './category/category.module';
import { ChatModule } from './chat/chat.module';
import { LoginModule } from './login/login.module';
import { ProductModule } from './product/product.module';
import { RegionModule } from './region/region.module';
import { SocialLoginModule } from './social-login/social-login.module';
import { UserModule } from './user/user.module';
import { LogoutModule } from './logout/logout.module';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: true, //프로덕션에서는 사용하면 안됨.
        namingStrategy: new SnakeNamingStrategy(),
        autoLoadEntities: true,
        timezone: 'Asia/Seoul',
        // dropSchema: true,
        //  logging: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    RegionModule,
    CategoryModule,
    ProductModule,
    ChatModule,
    SocialLoginModule,
    LoginModule,
    LogoutModule,
    AwsModule,
  ],
})
export class AppModule {}
