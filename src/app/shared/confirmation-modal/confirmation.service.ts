import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { confirmationTitles } from './confirmation-titles';

@Injectable()
export class ConfirmationService {
  isModalOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isModalConfirmed$: Subject<boolean> = new Subject<boolean>();

  private confirmationTitle: confirmationTitles = confirmationTitles.Null;

  openModal(title: confirmationTitles): void {
    this.confirmationTitle = title;
    this.isModalOpened$.next(true);
  }

  closeModal(): void {
    this.isModalOpened$.next(false);
    this.confirmationTitle = confirmationTitles.Null;
  }

  confirm(): void {
    this.isModalConfirmed$.next(true);
    this.closeModal();
  }

  reset(): void {
    this.isModalConfirmed$.next(false);
    this.closeModal();
  }

  get currentConfirmationTitle(): confirmationTitles {
    return this.confirmationTitle;
  }
}
