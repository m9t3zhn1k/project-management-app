import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  isActiveMenu: boolean = false;

  isRuLangActive: boolean = false;

  isEnLangActive: boolean = true;

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
