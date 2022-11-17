import { UserModel } from '@core/models/user.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsModule } from '@auth/validators/validators.module';
import { userSelector } from '@app/core/store/selectors/auth.selectors';
import * as AuthActions from '@core/store/actions/auth.actions';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss'],
})
export class EditUserFormComponent implements OnInit {
  editUserForm: FormGroup = new FormGroup(
    {
      name: new FormControl<string>('', this.customValidators.name),
      login: new FormControl<string>('', this.customValidators.login),
      /* currentPassword: new FormControl<string>('', [Validators.required, Validators.minLength(8)]), */
      password: new FormControl<string>('', this.customValidators.password),
      passwordConfirm: new FormControl<string>('', Validators.required),
    },
    { validators: this.customValidators.confirmPassword },
  );

  readonly user$: Observable<UserModel | null> = this.store.select(userSelector);

  constructor(private customValidators: ValidatorsModule, private store: Store) {}

  ngOnInit(): void {
    this.user$.subscribe((user: UserModel | null) => {
      this.editUserForm.controls.name.setValue(user?.name);
      this.editUserForm.controls.login.setValue(user?.login);
    });
  }

  submitForm(): void {
    this.store.dispatch(
      AuthActions.UpdateUser({
        name: this.editUserForm.value.name,
        login: this.editUserForm.value.login,
        password: this.editUserForm.value.password,
      }),
    );
  }
}
