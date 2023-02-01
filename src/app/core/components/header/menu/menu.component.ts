import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { userSelector } from '@core/store/selectors/auth.selectors';
import * as AuthActions from '@core/store/actions/auth.actions';
import { AppLanguage } from '@shared/enums/AppLanguage';
import { LocalStorageKeys } from '@shared/enums/LocalStorageKeys';
import { ConfirmationService } from '@app/shared/confirmation-modal/confirmation.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  isActiveMenu: boolean = false;

  appLanguage: string = localStorage.getItem(LocalStorageKeys.LANG) || AppLanguage.En;

  user$ = this.store.select(userSelector);

  constructor(
    private store: Store,
    private translateService: TranslateService,
    public confirmationService: ConfirmationService,
  ) {
    this.translateService.use(this.appLanguage);
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
}
