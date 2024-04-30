import { CreatedCredentialsEntity } from "src/data/dto/credentials_created_dto";

export class UserDto {
    constructor(
        public name: string,
        public email: string,
        public password: string
    ) { }


}