import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AppLanguage } from '@app/shared/enums/AppLanguage';
import { LocalStorageKeys } from '@app/shared/enums/LocalStorageKeys';

export function confirmPasswordValidator(group: AbstractControl<string>): ValidationErrors | null {
  const password: string = group.get('password')?.value;
  const passwordConfirm: string = group.get('passwordConfirm')?.value;
  const appLanguage: string = localStorage.getItem(LocalStorageKeys.LANG) || AppLanguage.En;
  return password === passwordConfirm
    ? null
    : appLanguage === AppLanguage.En
    ? { error: 'This password does not match that entered in the password field' }
    : { error: 'Пароль не совпадает с введеным ранее' };
}
