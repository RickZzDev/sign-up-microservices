export class CreateCredentialsEntity {
    constructor(
        public name: string,
        public email: string,
        public password: string
    ) { }
}