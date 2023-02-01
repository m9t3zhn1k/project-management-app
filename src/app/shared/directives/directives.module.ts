import { NgModule } from '@angular/core';

import { AutofocusDirective } from './autofocus/autofocus.directive';

@NgModule({
  declarations: [AutofocusDirective],
  exports: [AutofocusDirective],
})
export class DirectivesModule {}
