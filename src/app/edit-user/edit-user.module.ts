import { NgModule } from '@angular/core';
import { EditUserRoutingModule } from './edit-user-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { DirectivesModule } from './../shared/directives/directives.module';
import { ValidatorsModule } from '../auth/validators/validators.module';

import { EditUserFormComponent } from './components/edit-user-form/edit-user-form.component';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';

@NgModule({
  declarations: [EditUserFormComponent, EditUserPageComponent],
  imports: [
    CommonModule,
    EditUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    ValidatorsModule,
    TranslateModule,
  ],
})
export class EditUserModule {}
