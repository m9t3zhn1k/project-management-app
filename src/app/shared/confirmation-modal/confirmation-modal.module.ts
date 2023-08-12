import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ConfirmationModalComponent } from './confirmation-modal.component';
import { ConfirmationService } from './confirmation.service';

@NgModule({
  declarations: [ConfirmationModalComponent],
  exports: [ConfirmationModalComponent],
  imports: [TranslateModule],
  providers: [ConfirmationService],
})
export class ConfirmationModalModule {}
