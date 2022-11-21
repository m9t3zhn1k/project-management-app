import { Component } from '@angular/core';
import { ToastService } from './../service/toast.service';
import { ToastDataModel } from './../models/toast.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  data$: Subject<ToastDataModel | null> = this.toastService.toastData$;

  constructor(private toastService: ToastService) {}
}
