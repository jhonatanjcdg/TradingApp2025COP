/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { User } from './users.entity';
import { DataSource, Repository } from 'typeorm';
import { UserDto } from './users.dto';
import * as bcrypt from 'bcrypt'
import { ChangePasswordDto } from './changePassword.dto';
import { SetPasswordDto } from './setPassword.dto';

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
    const user: User = await this.usersRepository.findOne({
      where: {id},
      // relations: {}
    })
    if(!user){
      throw new NotFoundException('User not found')
    }
    return user
  }

  async getUserByEmail(mail: string) /* User */{
    const user: User = await this.usersRepository.findOne({
      where: {},
      // relations: {}
    })
    if(!user){
      throw new NotFoundException('User not found')
    }
    return user
  }

  async createUser(user: UserDto){
    const newUser: User = await this.usersRepository.create(user)
    if(!newUser){
      throw new BadRequestException('Error creating user')
    }
    await this.usersRepository.save(newUser)
    return newUser
  }

  async updateUser(id: UUID, updateProfileDto: UserDto){
    try{
      const user = await this.usersRepository.findOne({where: {id}})
      if(!user){
        throw new NotFoundException('User not found')
      }
      for(const key in updateProfileDto){
        if(user[key] !== updateProfileDto){
          user[key] = updateProfileDto[key]
        }
      }
      await this.usersRepository.merge(user, updateProfileDto)
      await this.usersRepository.save(user)
      return user
    }
    catch(error){
      if(error instanceof NotFoundException){
        throw new HttpException(error.message, HttpStatus.NOT_FOUND)
      }
      throw new HttpException('Error updating profile', HttpStatus.BAD_REQUEST)
    }
  }

  async setPassword(id: UUID, setPasswordDto: SetPasswordDto){
    try{
      const { newPassword, confirmPassword } = setPasswordDto

      const user = await this.usersRepository.findOne({where: {id}})
      if(!user){
        throw new HttpException(
          `User with id: ${id} not found`,
          HttpStatus.NOT_FOUND
        )
      }

      if(newPassword !== confirmPassword){
        throw new HttpException(
          'New password and confirmation password do not match',
          HttpStatus.BAD_REQUEST
        )
      }

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(newPassword, salt)

      await this.usersRepository.save(user)
      return 'Password changed successfully'
    }
    catch(error){
      if(error instanceof NotFoundException || error instanceof BadRequestException){
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(
        'Error resetting password',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto
  ): Promise<string>{
    try{
      const {currentPassword, newPassword, confirmPassword} = changePasswordDto
      const user = await this.usersRepository.findOne({where: {id}})

      if(!user){
        throw new HttpException(
          `User with ${id} not exist`,
          HttpStatus.NOT_FOUND
        )
      }

      const passwordMatches = await bcrypt.compare(currentPassword, user.password)
      if(!passwordMatches){
        throw new HttpException(
          'The current  password is incorrect',
          HttpStatus.BAD_REQUEST
        )
      }

      if(newPassword !== confirmPassword){
        throw new HttpException(
          'New password and confirmation do not match',
          HttpStatus.BAD_REQUEST,
        )
      }

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(newPassword, salt)

      await this.usersRepository.save(user)
      return 'Successfully changed password'
    }
    catch(error){
      if(error instanceof NotFoundException || error instanceof BadRequestException){
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(
        'Error changing password',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async deleteUser(id: UUID): Promise<string>{
    try{
      const  result = await this.usersRepository.delete(id)
      if(result.affected === 0){
        throw new HttpException(
          `User with ${id} not exists`,
          HttpStatus.NOT_FOUND,
        )
      }
      return `User with id: ${id} deleted`
    }
    catch(error){
      if(error instanceof NotFoundException){
        throw new HttpException(error.message, HttpStatus.NOT_FOUND)
      }
      throw new HttpException(
        'Error deleting user',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
