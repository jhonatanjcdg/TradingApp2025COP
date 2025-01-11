import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UUID } from 'crypto'
import { UserDto } from './users.dto'
import { ChangePasswordDto } from "./changePassword.dto";
import { SetPasswordDto } from "./setPassword.dto";

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

    changePassword(id: UUID, changePassword: ChangePasswordDto){
        return this.changePassword(id, changePassword)
    }

    setPassword(id: UUID, setPasswordDto: SetPasswordDto){
        return this.usersRepository.setPassword(id, setPasswordDto)
    }

    deleteUser(id: UUID){
        return this.usersRepository.deleteUser(id)
    }
}