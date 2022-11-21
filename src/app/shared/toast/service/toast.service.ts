import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { ToastDataModel } from './../models/toast.model';
import { toastShowTime } from '@constants/constants';

@Injectable()
export class ToastService {
  toastData$: Subject<ToastDataModel | null> = new Subject();

  showToast(data: ToastDataModel): void {
    this.toastData$.next(data);
    setTimeout(() => this.hideToast(), toastShowTime);
  }

  hideToast(): void {
    this.toastData$.next(null);
  }
}
