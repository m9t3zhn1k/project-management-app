import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl<string>): ValidationErrors | null {
  if (!control.value.length) {
    return { error: 'Please enter a password' };
  } else if (control.value.length < 8) {
    return { error: 'The password is too short' };
  } else if (control.value.length > 100) {
    return { error: 'The password is too long' };
  } else if (!(control.value.match(/[A-ZА-Я]/g) && control.value.match(/[a-zа-я]/g))) {
    return { error: 'The password must contain a mixture of both uppercase and lowercase letters' };
  } else if (!(control.value.match(/[[A-ZА-Яa-zа-я]/g) && control.value.match(/[[0-9]/g))) {
    return { error: 'The password must be a mixture of letters and numbers' };
  } else if (!control.value.match(/[!@#?$%^&*]/g)) {
    return { error: 'The password must include at least one special character' };
  }
  return null;
}
