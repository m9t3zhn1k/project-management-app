import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

type Theme = 'light' | 'dark';

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.scss'],
})
export class DarkModeComponent implements OnInit {
  mode: Theme = 'light';

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.initializeTheme();
  }

  switchTheme(): void {
    this.document.body.classList.replace(
      this.mode,
      this.mode === 'light' ? (this.mode = 'dark') : (this.mode = 'light'),
    );
  }

  initializeTheme = (): void => this.renderer.addClass(this.document.body, this.mode);
}
