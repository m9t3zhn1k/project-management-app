import { Component } from '@angular/core';
import { ConfirmationService } from './confirmation.service';

@Component({
  selector: 'app-confirmational-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  question: string = 'Are you sure you want to perform this action?';

  constructor(public confirmationService: ConfirmationService) {}

  closeModal(event: Event): void {
    if ((event.target as HTMLElement).dataset.closeTarget) {
      event.stopPropagation();
      this.confirmationService.closeModal();
    }
  }

  confirm(): void {
    this.confirmationService.confirm();
  }

  reset(): void {
    this.confirmationService.reset();
  }
}
