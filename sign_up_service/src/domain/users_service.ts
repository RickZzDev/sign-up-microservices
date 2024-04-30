import { Injectable } from "@nestjs/common";
import { CreatedCredentialsEntity } from "src/data/dto/credentials_created_dto";
import { UserDto } from "src/presentation/users/dto/user_dto";

@Injectable()
export abstract class UserService {
    abstract save(createdCredentialsEntity: CreatedCredentialsEntity): Promise<void>
}