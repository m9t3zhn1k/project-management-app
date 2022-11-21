import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import * as AuthActions from './core/store/actions/auth.actions';
import { isPendingSelector } from '@core/store/selectors/auth.selectors';
import { ConfirmationService } from '@app/shared/confirmation-modal/confirmation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostBinding('class') value = 'root';

  isPending: Observable<boolean> = this.store.select(isPendingSelector);

  isModalOpened$: BehaviorSubject<boolean> = this.confirmationService.isModalOpened$;

  constructor(private store: Store, public confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      this.store.dispatch(AuthActions.getUser({ token }));
    }
  }
}
