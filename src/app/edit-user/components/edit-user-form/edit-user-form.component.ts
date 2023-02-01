import { UserModel } from '@core/models/user.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsModule } from '@auth/validators/validators.module';
import { userSelector } from '@app/core/store/selectors/auth.selectors';
import * as AuthActions from '@core/store/actions/auth.actions';
import { ConfirmationService } from '@app/shared/confirmation-modal/confirmation.service';
import { ConfirmationTitles } from '@app/shared/confirmation-modal/confirmation-titles';
import { TranslateService } from '@ngx-translate/core';
import { AppLanguage } from '@shared/enums/AppLanguage';
import { LocalStorageKeys } from '@shared/enums/LocalStorageKeys';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss'],
})
export class EditUserFormComponent implements OnInit {
  private destroy: Subject<boolean> = new Subject<boolean>();

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

  deleteUser$ = this.confirmationService.isModalConfirmed$
    .pipe(takeUntil(this.destroy))
    .subscribe((value: boolean): void => {
      const isDeleteUserCurrentTitle: boolean =
        this.confirmationService.currentConfirmationTitle === ConfirmationTitles.DeleteUser;
      if (value && isDeleteUserCurrentTitle) {
        this.onDeleteUser();
      }
    });

  appLanguage: string = localStorage.getItem(LocalStorageKeys.LANG) || AppLanguage.En;

  readonly user$: Observable<UserModel | null> = this.store.select(userSelector);

  constructor(
    private customValidators: ValidatorsModule,
    private store: Store,
    private confirmationService: ConfirmationService,
    private translateService: TranslateService,
  ) {
    this.translateService.use(this.appLanguage);
  }

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

  onOpenConfirmModal(e: Event): void {
    e.preventDefault();
    this.confirmationService.openModal(ConfirmationTitles.DeleteUser);
  }

  onDeleteUser(): void {
    this.store.dispatch(AuthActions.DeleteUser());
  }
}
