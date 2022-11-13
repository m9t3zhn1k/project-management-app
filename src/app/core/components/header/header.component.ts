import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { userSelector } from './../../../auth/store/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isDarkMode: boolean = false;
  
  user$ = this.store.select(userSelector);

  constructor(private store: Store) {}
}
