import { AbstractControl, ValidationErrors } from '@angular/forms';

export function nameValidator(control: AbstractControl<string>): ValidationErrors | null {
  if (!control.value.length) {
    return { error: 'Please enter a name' };
  } else if (control.value.length < 3) {
    return { error: 'The name is too short' };
  } else if (control.value.length > 30) {
    return { error: 'The name is too long' };
  } else if (!control.value.match(/^[A-Za-zА-Яа-я\s]*$/)) {
    return { error: 'Please enter name using only letters and spaces' };
  }
  return null;
}
