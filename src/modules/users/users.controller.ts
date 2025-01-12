/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Req, RawBodyRequest } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { UserDto } from './users.dto';
import { ChangePasswordDto } from './changePassword.dto';
import { SetPasswordDto } from './setPassword.dto';
import { FastifyRequest } from 'fastify';

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
  
  @Post('generate-token-user')
  generateTokenUser(
    @Param('id') id: UUID, 
    @Param('email') email: string,
    @Param('permissions') permissions: Array<String>,
    @Param('roles') roles: Array<String>,
    @Param('timestamp') timestamp: Date,
  
  ) {
    //'id', 'email', 'permissions', 'roles', 'timestamp'
    return this.usersService.generateTokenUser(id, email, permissions, roles, timestamp)
  }
}
