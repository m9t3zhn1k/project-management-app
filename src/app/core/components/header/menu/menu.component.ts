import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { userSelector } from '@core/store/selectors/auth.selectors';
import * as AuthActions from '@core/store/actions/auth.actions';
import { AppLanguage } from '@shared/enums/AppLanguage';
import { LocalStorageKeys } from '@shared/enums/LocalStorageKeys';
import { ConfirmationService } from '@app/shared/confirmation-modal/confirmation.service';
import { ConfirmationTitles } from '@app/shared/confirmation-modal/confirmation-titles';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  isActiveMenu: boolean = false;

  appLanguage: string = localStorage.getItem(LocalStorageKeys.LANG) || AppLanguage.En;

  user$ = this.store.select(userSelector);

  deleteUser$ = this.confirmationService.isModalConfirmed$
    .pipe(takeUntil(this.destroy))
    .subscribe((value: boolean): void => {
      const isDeleteUserCurrentTitle: boolean =
        this.confirmationService.currentConfirmationTitle === ConfirmationTitles.DeleteUser;
      if (value && isDeleteUserCurrentTitle) {
        this.onDeleteUser();
      }
    });

  constructor(
    private store: Store,
    private translateService: TranslateService,
    public confirmationService: ConfirmationService,
  ) {
    this.translateService.use(this.appLanguage);
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  onToggleMenu(): void {
    this.isActiveMenu = !this.isActiveMenu;
  }

  onCloseMenu(): void {
    this.isActiveMenu = false;
  }

  onToggleLang(lang: string): void {
    this.appLanguage = lang;
    localStorage.setItem(LocalStorageKeys.LANG, lang);
    this.translateService.use(this.appLanguage);
  }

  onLogOut(): void {
    this.store.dispatch(AuthActions.LogOut());
  }

  onDeleteUser(): void {
    this.store.dispatch(AuthActions.DeleteUser());
  }

  onOpenConfirmModal(): void {
    this.confirmationService.openModal(ConfirmationTitles.DeleteUser);
    this.onCloseMenu();
  }
}
