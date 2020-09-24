import { JwtOptionsFactory, JwtModuleAsyncOptions } from "@nestjs/jwt";

import {ConfigService} from '@nestjs/config'
import {JwtModuleOptions} from '@nestjs/jwt'
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtConfigService implements JwtOptionsFactory{
  constructor(private readonly config:ConfigService){}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.config.get<string>('AUTH_JWT_SIGNATURE_KEY'),
      signOptions:{
        expiresIn:'60s'
      }
    }
  }
}