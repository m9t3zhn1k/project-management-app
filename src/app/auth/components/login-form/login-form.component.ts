import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginFormDataModel } from './../../models/formData.model';
import * as AuthActions from '../../store/auth.actions';

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

  constructor(private router: Router, private store: Store) {}

  submitForm(): void {
    const data: LoginFormDataModel = this.loginForm.value;
    this.store.dispatch(AuthActions.LogIn(data));
    /* this.router.navigateByUrl(''); */
  }
}
