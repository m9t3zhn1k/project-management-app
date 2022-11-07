import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsModule } from '../../validators/validators.module';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent {
  signUpForm: FormGroup = new FormGroup(
    {
      userName: new FormControl<string>('', this.customValidators.name),
      userLogin: new FormControl<string>('', this.customValidators.login),
      userNewPassword: new FormControl<string>('', this.customValidators.password),
      userNewPasswordConfirm: new FormControl<string>('', Validators.required),
    },
    { validators: this.customValidators.confirmPassword },
  );

  constructor(private customValidators: ValidatorsModule, private router: Router) {}

  submitForm(): void {
    this.router.navigateByUrl('');
  }
}
