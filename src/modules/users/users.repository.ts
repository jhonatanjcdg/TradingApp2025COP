/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { User } from './users.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async getUsers() {
    const users: User[] = await this.usersRepository.find()
    if(!users){
      throw new NotFoundException('Users not found')
    }
    return users
  }

  async getUserById(id: UUID){
    return await {}
  }

  async getUserByEmail(mail: string) /* User */{
    return await {}
  }
}
