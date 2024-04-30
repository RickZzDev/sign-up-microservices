
import { Inject, Injectable } from "@nestjs/common";
import { CreateCredentialsService } from "src/domain/auth/create_credentials_service";
import { CreateCredentialsEntity } from "src/domain/entities/create_credentials_entity";
import * as firebase from "firebase-admin"
import { ClientProxy } from "@nestjs/microservices";
import { CreatedCredentialsEntity } from "src/data/dto/credentials_created_dto";
import { getApps } from "firebase-admin/app";
import * as serviceAccount from './google-services.json';


@Injectable()
export class FirebaseCreateCredentialsService implements CreateCredentialsService {

    constructor(@Inject('CREDENTIALS_CREATE_SERVICE') private rabbitClient: ClientProxy) { }

    firebase_params = {
        type: serviceAccount.type,
        projectId: serviceAccount.project_id,
        privateKeyId: serviceAccount.private_key_id,
        privateKey: serviceAccount.private_key,
        clientEmail: serviceAccount.client_email,
        clientId: serviceAccount.client_id,
        authUri: serviceAccount.auth_uri,
        tokenUri: serviceAccount.token_uri,
        authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
        clientC509CertUrl: serviceAccount.client_x509_cert_url
    }

    async save(createCredentialsEntity: CreateCredentialsEntity,): Promise<void> {

        getApps().length === 0
            ? firebase.initializeApp({ credential: firebase.credential.cert(this.firebase_params) })
            : null;
        const UserRecord = await firebase.auth().createUser({
            email: createCredentialsEntity.email,
            password: createCredentialsEntity.password,
            displayName: createCredentialsEntity.name

        })

        const createdCredentialsEntity = new CreatedCredentialsEntity(UserRecord.uid, UserRecord.displayName, UserRecord.email,)
        this.rabbitClient.emit('credentials-created', createdCredentialsEntity);

        console.log("Credentials created, event sent to credentials-created")
    }
}