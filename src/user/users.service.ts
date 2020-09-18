import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/models/user.model';
import { MailService } from 'src/mail/mail.service';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private mailService: MailService
  ) {}

  async find(){
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({username});
    return user
  }

  async store(body: User): Promise<User>{
    const user = this.usersRepository.create(body);
    if(user) {
      this.mailService.sendEmail({
        from: 'marcus.silva@centralit.com.br',
        to: 'marcus.palmas@gmail.com',
        subject:'teste'
      })
    }
    return this.usersRepository.save(user)
  }
}
