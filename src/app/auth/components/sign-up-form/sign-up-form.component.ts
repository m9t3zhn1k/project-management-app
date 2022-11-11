import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsModule } from '../../validators/validators.module';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent {
  isModalOpened: boolean = false;

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
    const data = { ...this.signUpForm.value };
    delete data.passwordConfirm;
    this.store.dispatch(AuthActions.SignUp(data));
  }
}
