import { AbstractControl, ValidationErrors } from '@angular/forms';

export function loginValidator(control: AbstractControl<string>): ValidationErrors | null {
  if (!control.value.length) {
    return { error: 'Please enter a login' };
  } else if (control.value.length < 3) {
    return { error: 'The login is too short' };
  } else if (control.value.length > 30) {
    return { error: 'The login is too long' };
  } else if (!control.value.match(/^[A-Za-zА-Яа-я\s]*$/)) {
    return { error: 'Please enter login using only letters and spaces' };
  }
  return null;
}
