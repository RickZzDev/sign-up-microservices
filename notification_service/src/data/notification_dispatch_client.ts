// import { ClientProxy } from "@nestjs/microservices";
import { ClientProxy } from "@nestjs/microservices";
import { Inject, Injectable } from "@nestjs/common";
import { NotificationRequest } from "src/dto/notifications_request";


@Injectable()
export class NotificationDispatchClient {
    @Inject('NOTIFICATION_SERVICE')
    rabbitClient: ClientProxy

    async sendNotification(notificationRequest: NotificationRequest): Promise<void> {
        this.rabbitClient.emit('notification-request', notificationRequest);
    }
}