import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsModule } from '../../../auth/validators/validators.module';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss'],
})
export class EditUserFormComponent {
  editUserForm: FormGroup = new FormGroup(
    {
      userName: new FormControl<string>('', this.customValidators.name),
      userLogin: new FormControl<string>('', this.customValidators.login),
      userPassword: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
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
