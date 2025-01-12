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

    getUserByEmail(email: string){
        return this.usersRepository.getUserByEmail(email)
    }

    createUser(user: UserDto){
        return this.usersRepository.createUser(user)
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
    generateTokenUser(id: UUID, email: string, permissions: Array<String>, roles: Array<String>, timestamp: Date) {
        return this.usersRepository.generateTokenUser(id, email, permissions, roles, timestamp)
    }
}