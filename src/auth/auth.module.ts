import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import {PassportModule} from '@nestjs/passport'
import {LocalStrategy} from './local.strategy'
import {JwtStrategy} from './jwt.strategy'
import { JwtModule } from "@nestjs/jwt"
import {jwtConstants} from './constants'
import {JwtConfigService} from './jwtConfigService'

@Module({
  imports:[
      UserModule, 
      PassportModule,
      JwtModule.registerAsync({
        useClass: JwtConfigService
      })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtConfigService],
  exports:[AuthService]
})
export class AuthModule {}
