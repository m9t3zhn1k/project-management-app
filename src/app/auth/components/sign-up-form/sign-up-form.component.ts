import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsModule } from '@auth/validators/validators.module';
import { Store } from '@ngrx/store';
import * as AuthActions from '@core/store/actions/auth.actions';
import { SignUpRequestModel } from '@app/core/models/backend-api.model';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent {
  signUpForm: FormGroup = new FormGroup(
    {
      name: new FormControl<string>('', this.customValidators.name),
      login: new FormControl<string>('', this.customValidators.login),
      password: new FormControl<string>('', this.customValidators.password),
      passwordConfirm: new FormControl<string>('', Validators.required),
    },
    { validators: this.customValidators.confirmPassword },
  );

  constructor(private customValidators: ValidatorsModule, private store: Store) {}

  submitForm(): void {
    const data: SignUpRequestModel = {
      name: this.signUpForm.value.name,
      login: this.signUpForm.value.login,
      password: this.signUpForm.value.password,
    };
    this.store.dispatch(AuthActions.SignUp(data));
  }
}
