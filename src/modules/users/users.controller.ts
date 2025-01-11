/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { UserDto } from './users.dto';

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

  @Get('email')
  getUserByEmail(@Param('email') email: string){
    return this.getUserByEmail(email)
  }
  
  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: UUID){
    return this.getUserById(id)
  }

  @Post()
  createUser(@Body() user: UserDto){
    return this.createUser(user)
  }

  @Put('profile/:id')
  updateUser(@Param('id', ParseUUIDPipe) id: UUID, @Body() updateProduleDto: UserDto){
    return this.updateUser(id, updateProduleDto)
  }

  @Delete()
  deleteUser(@Param('id', ParseUUIDPipe) id: UUID){
    return this.deleteUser(id)
  }
}
