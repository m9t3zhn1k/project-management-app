import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorsModule } from './validators/validators.module';

import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  declarations: [SignUpPageComponent, LoginPageComponent, SignUpFormComponent, LoginFormComponent],
  imports: [AuthRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, ValidatorsModule],
})
export class AuthModule {}
