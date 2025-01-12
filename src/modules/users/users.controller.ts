/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { UserDto } from './dtos/users.dto';
import { ChangePasswordDto } from './dtos/changePassword.dto';
import { SetPasswordDto } from './dtos/setPassword.dto';

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
    return this.usersService.getUserByEmail(email)
  }
  
  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: UUID){
    return this.usersService.getUserById(id)
  }

  @Post()
  createUser(@Body() user: UserDto){
    return this.usersService.createUser(user)
  }

  @Put('profile/:id')
  updateUser(@Param('id', ParseUUIDPipe) id: UUID, @Body() updateProduleDto: UserDto){
    return this.usersService.updateUser(id, updateProduleDto)
  }

  @Put('change-password/:id')
  async changePassword(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() changePassword: ChangePasswordDto
  ){
    return this.usersService.changePassword(id, changePassword)
  }

  @Put('set-password/id')
  async setPassword(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() setPasswordDto: SetPasswordDto,
  ){
    return this.usersService.setPassword(id, setPasswordDto)
  }

  @Delete()
  deleteUser(@Param('id', ParseUUIDPipe) id: UUID){
    return this.usersService.deleteUser(id)
  }
}
