import { Component } from '@angular/core';
import { ConfirmationService } from '@app/shared/confirmation-modal/services/confirmation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isDarkMode: boolean = false;

  constructor(public confirmationService: ConfirmationService) {}
}
