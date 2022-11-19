import { NgModule } from '@angular/core';

import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { ConfirmationService } from './services/confirmation.service';

@NgModule({
  declarations: [ConfirmationModalComponent],
  exports: [ConfirmationModalComponent],
  providers: [ConfirmationService],
})
export class ConfirmationModalModule {}
