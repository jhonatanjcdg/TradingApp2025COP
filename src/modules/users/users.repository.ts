/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor() {}

  getUsers() {
    return ['User 1', 'User 2', 'User 3'];
  }
}
