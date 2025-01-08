/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  )
  {}

  @Get()
  getUsers() {
    return this.usersService.getUsers()
  }
}
