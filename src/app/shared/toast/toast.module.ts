import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastComponent } from './component/toast.component';
import { ToastService } from './service/toast.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ToastComponent],
  exports: [ToastComponent],
  providers: [ToastService],
})
export class ToastModule {}
