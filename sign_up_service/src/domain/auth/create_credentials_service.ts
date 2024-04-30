import { Injectable } from "@nestjs/common";
import { CreateCredentialsEntity } from "../entities/create_credentials_entity";

@Injectable()
export abstract class CreateCredentialsService {
    abstract save(createCredentialsEntity: CreateCredentialsEntity): Promise<void>
}