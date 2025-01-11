import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UUID } from 'crypto'
import { UserDto } from './users.dto'

@Injectable()
export class UsersService{
    constructor(private readonly usersRepository: UsersRepository)
    {}

    getUsers(){
        return this.usersRepository.getUsers();
    }

    getUserById(id: UUID){
        return this.usersRepository.getUserById(id)
    }

    getUserByEmail(id: UUID){
        return this.usersRepository.getUserByEmail(id)
    }

    updateUser(id: UUID, updateProfileDto: UserDto){
        return this.usersRepository.updateUser(id, updateProfileDto)
    }

    deleteUser(id: UUID){
        return this.usersRepository.deleteUser(id)
    }
}