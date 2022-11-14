import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { userSelector } from '@auth/store/auth.selectors';
import * as AuthActions from '@auth/store/auth.actions';

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

  ngOnInit(): void {
    const userData: string | null = localStorage.getItem('token');
    if (userData) {
      const data: string = JSON.parse(userData);
      this.store.dispatch(AuthActions.getUser({token: data}));
    }
  }

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
