import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import {ConfigModule} from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      // @ts-ignore
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      autoLoadEntities:true
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    UserModule,
    MailModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService, MailService, AppGateway],
})
export class AppModule {}
