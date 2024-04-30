export class NotificationRequest {
    private constructor(public target: string, public notificationType: NotificationType) { }

    static sendEmail(target: string) {
        return new NotificationRequest(target, NotificationType.EMAIL);
    }

    static sendSms(target: string) {
        return new NotificationRequest(target, NotificationType.SMS);
    }
}


enum NotificationType {
    EMAIL = 'email',
    SMS = 'sms',
}
