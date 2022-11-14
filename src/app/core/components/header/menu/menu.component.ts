import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { userSelector } from '@auth/store/auth.selectors';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  isActiveMenu: boolean = false;

  isRuLangActive: boolean = false;

  isEnLangActive: boolean = true;

  user$ = this.store.select(userSelector);

  constructor(private store: Store) {}

  onToggleMenu(): void {
    this.isActiveMenu = !this.isActiveMenu;
  }

  onCloseMenu(): void {
    this.isActiveMenu = false;
  }

  setRuLang(): void {
    this.isRuLangActive = true;
    this.isEnLangActive = false;
  }

  setEnLang(): void {
    this.isEnLangActive = true;
    this.isRuLangActive = false;
  }
}
