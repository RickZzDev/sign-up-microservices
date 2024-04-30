import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "src/domain/users_service";
import { PrismaService } from "../prisma_service";
import { UserDto } from "src/presentation/users/dto/user_dto";
import { randomUUID } from "crypto";
import { ClientProxy } from "@nestjs/microservices";
import { CreatedCredentialsEntity } from "src/data/dto/credentials_created_dto";
import { UserCreatedDto } from "./dto/user_created_dto";
import { NotificationRequest } from "src/data/dto/notifications_request";

@Injectable()
export class PrismaUserService implements UserService {
    constructor(private readonly prismaService: PrismaService, @Inject('NOTIFICATION_SERVICE') private rabbitClient: ClientProxy) { }
    async save(createdCredentialsEntity: CreatedCredentialsEntity): Promise<void> {
        await this.prismaService.user.create({
            data: {
                id: createdCredentialsEntity.id,
                name: createdCredentialsEntity.name,
                email: createdCredentialsEntity.email,
            }
        });
        this.rabbitClient.emit('notification-request', NotificationRequest.sendEmail(createdCredentialsEntity.email));
        console.log("User created, event sent to notification-request")

    }
}