import { Injectable } from '@nestjs/common';
import { NotificationRequest } from './dto/notifications_request';

@Injectable()
export class AppService {
  sendEmail(notificationRequest: NotificationRequest): void {
    console.log(`Message read of notification-request`);

    console.log(`Sending notification of type ${notificationRequest.notificationType}  to ${notificationRequest.target}`);
  }
}
