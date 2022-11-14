import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ValidatorsModule } from './validators/validators.module';
import { DirectivesModule } from '@shared/directives/directives.module';
import { ConfirmationModalModule } from '@shared/confirmation-modal/confirmation-modal.module';

import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  declarations: [SignUpPageComponent, LoginPageComponent, SignUpFormComponent, LoginFormComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ValidatorsModule,
    DirectivesModule,
    ConfirmationModalModule,
  ],
})
export class AuthModule {}
