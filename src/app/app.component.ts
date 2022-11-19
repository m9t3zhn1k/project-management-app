import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from './core/store/actions/auth.actions';
import { ConfirmationService } from '@app/shared/confirmation-modal/services/confirmation.service';
import { isPendingSelector } from '@core/store/selectors/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostBinding('class') value = 'root';

  isPending: Observable<boolean> = this.store.select(isPendingSelector);

  constructor(private store: Store, public confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      this.store.dispatch(AuthActions.getUser({ token }));
    }
  }
}
