import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { LocalStorageKeys } from '@app/shared/enums/LocalStorageKeys';

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.scss'],
})
export class DarkModeComponent implements OnInit {
  themeMode: string = localStorage.getItem(LocalStorageKeys.DARKMODE) || LocalStorageKeys.LIGHTMODE;

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.initializeTheme();
  }

  switchTheme(): void {
    if (this.themeMode === LocalStorageKeys.DARKMODE) {
      this.themeMode = '';
      localStorage.removeItem(LocalStorageKeys.DARKMODE);
      this.document.documentElement.classList.remove(LocalStorageKeys.DARKMODE);
    } else {
      this.themeMode = LocalStorageKeys.DARKMODE;
      localStorage.setItem(LocalStorageKeys.DARKMODE, LocalStorageKeys.DARKMODE);
      this.document.documentElement.classList.add(LocalStorageKeys.DARKMODE);
    }
  }

  initializeTheme = (): void => {
    if (this.themeMode) {
      this.renderer.addClass(this.document.documentElement, this.themeMode);
    }
  };
}
