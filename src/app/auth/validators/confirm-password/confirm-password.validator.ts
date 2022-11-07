import { AbstractControl, ValidationErrors } from '@angular/forms';

export function confirmPasswordValidator(group: AbstractControl<string>): ValidationErrors | null {
  const password: string = group.get('userNewPassword')?.value;
  const confirmPassword: string = group.get('userNewPasswordConfirm')?.value;
  return password === confirmPassword
    ? null
    : { error: 'This password does not match that entered in the password field, please try again' };
}
