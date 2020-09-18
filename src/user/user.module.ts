import { Module } from '@nestjs/common';
import {UsersService} from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { UserController } from './user.controller';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailService],
  providers:[UsersService, UserController, MailService],
  exports:[UsersService]
})
export class UserModule {}
