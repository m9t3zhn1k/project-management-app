import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, of, catchError } from 'rxjs';
import { AuthService } from './../services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SignUp),
      switchMap((action) => {
        return this.authService
          .signUp({
            name: action.name,
            login: action.login,
            password: action.password,
          })
          .pipe(
            map((value) => AuthActions.SignUpSuccess({ user: value })),
            catchError(() => of(AuthActions.SignUpFailed())),
          );
      }),
    ),
  );
}
