import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './data/services/prisma_service';
import { UsersControllers } from './presentation/users/users_controller';
import { UserService } from './domain/users_service';
import { PrismaUserService } from './data/services/user/prisma_user_service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CreateCredentialsService } from './domain/auth/create_credentials_service';
import { FirebaseCreateCredentialsService } from './data/services/auth/create_credentials_service';
import { PreauthMiddleware } from './auth/preauth.middleware';



@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'notifications-queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'CREDENTIALS_CREATE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'credentials-created-queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ])
  ],
  controllers: [UsersControllers],
  providers: [AppService,
    PrismaService,
    {
      provide: UserService,
      useClass: PrismaUserService
    },

    {
      provide: CreateCredentialsService,
      useClass: FirebaseCreateCredentialsService
    },
  ],
})

export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreauthMiddleware).forRoutes({
      path: '/games', method: RequestMethod.ALL
    });
  }
}
