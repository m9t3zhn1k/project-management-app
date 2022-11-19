import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { userSelector } from '@auth/store/auth.selectors';
import { AppLanguage } from '@shared/enums/AppLanguage';
import { LocalStorageKeys } from '@shared/enums/LocalStorageKeys';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  isActiveMenu: boolean = false;

  appLanguage: string = localStorage.getItem(LocalStorageKeys.LANG) || AppLanguage.En;

  user$ = this.store.select(userSelector);

  constructor(private store: Store, private translateService: TranslateService) {
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
}
