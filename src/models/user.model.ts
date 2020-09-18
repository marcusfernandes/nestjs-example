import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, BeforeUpdate} from "typeorm";
import { Exclude } from 'class-transformer';
import * as bcrypt from "bcrypt";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name:string;

  @Column()
  username:string;

  @Column()
  email:string;

  @Exclude()
  @Column()
  password:string;

  @CreateDateColumn({type:'timestamp'})
  created_at:Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

}
