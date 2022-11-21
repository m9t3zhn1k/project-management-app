import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginRequestModel } from '@app/core/models/backend-api.model';
import * as AuthActions from '../../../core/store/actions/auth.actions';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm: FormGroup = new FormGroup({
    login: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private store: Store) {}

  submitForm(): void {
    const data: LoginRequestModel = this.loginForm.value;
    this.store.dispatch(AuthActions.LogIn(data));
  }
}
