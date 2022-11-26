import { Component } from '@angular/core';
import { userSelector } from '@core/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user$ = this.store.select(userSelector);

  isDarkMode: boolean = false;

  constructor(private store: Store) {}
}
