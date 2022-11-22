import { NgModule } from '@angular/core';

import { ConfirmationModalComponent } from './confirmation-modal.component';
import { ConfirmationService } from './confirmation.service';

@NgModule({
  declarations: [ConfirmationModalComponent],
  exports: [ConfirmationModalComponent],
  providers: [ConfirmationService],
})
export class ConfirmationModalModule {}
