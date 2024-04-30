import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from 'src/domain/users_service';
import { UserDto } from './dto/user_dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import * as firebase from 'firebase-admin';
import { CreateCredentialsService } from 'src/domain/auth/create_credentials_service';
import { CreatedCredentialsEntity } from 'src/data/dto/credentials_created_dto';


@Controller('/users')
export class UsersControllers {
    constructor(private readonly userService: UserService, private readonly creteCredentialsService: CreateCredentialsService) { }


    @Post()
    async save(@Body() userDto: UserDto) {
        return await this.creteCredentialsService.save(userDto)
    }


    @EventPattern('credentials-created')
    async handleCredentialsCreated(@Payload() createdCredentialsEntity: CreatedCredentialsEntity) {
        return await this.userService.save(createdCredentialsEntity)
    }
}
