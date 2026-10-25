import { Component, inject } from '@angular/core';
import { XpNotification as XpNotificationService } from '../../services/xp-notification';

@Component({
  selector: 'app-xp-notification',
  templateUrl: './xp-notification.html',
  styleUrl: './xp-notification.scss',
})
export class XpNotification {
  notification = inject(XpNotificationService);
}
