import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationRequest } from './dto/notifications_request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @EventPattern('notification-request')
  getHello(@Payload() notificationRequest: NotificationRequest): void {
    this.appService.sendEmail(notificationRequest);
  }
}
