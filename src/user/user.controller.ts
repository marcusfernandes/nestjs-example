import { Controller, Get, Post, Body, Param, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  
  constructor(private readonly userService: UsersService){}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async index(): Promise<User[]>{
    return this.userService.find();
  }

  @Post('/loggin')
  findOne(@Body() username:string): Promise<User>{
    return this.userService.findOne(username) 
  }

  @Post()
  async store(@Body() body: User): Promise<User>{
    const user = await this.userService.store(body); 
    return user;
  }
}
