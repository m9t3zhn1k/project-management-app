import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmational-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  question: string = 'Are you sure you want to perform this action?';

  closeWindow(event: Event): void {
    if ((event.target as HTMLElement).dataset.closeTarget) {
      event.stopPropagation();
      this.closeModal.emit();
    }
  }
}
