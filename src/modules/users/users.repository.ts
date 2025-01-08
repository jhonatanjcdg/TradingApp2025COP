/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

@Injectable()
export class UsersRepository {
  constructor() {}

  async getUsers() {
    return await ['User 1', 'User 2', 'User 3'];
  }

  async getUserById(id: UUID){
    return await {}
  }

  async getUserByEmail(mail: string) /* User */{
    return await {}
  }
}
