import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class ConfirmationService {
  isModalOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isModalConfirmed: Subject<boolean> = new Subject<boolean>();

  openModal(): void {
    this.isModalOpened$.next(true);
  }

  closeModal(): void {
    this.isModalOpened$.next(false);
  }

  confirmModal(): void {
    this.isModalConfirmed.next(true);
    this.closeModal();
  }

  resetModal(): void {
    this.isModalConfirmed.next(false);
    this.closeModal();
  }
}
