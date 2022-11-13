import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, of, catchError, tap } from 'rxjs';
import { AuthService } from './../services/auth.service';
import * as AuthActions from './auth.actions';
import { UserResponseModel } from '../models/user.model';
import { LoginResponseModel } from '../models/login.model';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store,
    private router: Router,
  ) {}

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
            map((value: UserResponseModel) => AuthActions.SignUpSuccess({ user: value })),
            catchError(() => of(AuthActions.SignUpFailed())),
            tap(() =>
              this.store.dispatch(
                AuthActions.LogIn({
                  login: action.login,
                  password: action.password,
                }),
              ),
            ),
            /* switchMap(() => {
              return this.authService.logIn({login: action.login, password: action.password}).pipe(
                map((value: LoginResponseModel) => AuthActions.LogInSuccess(value)),
                catchError(() => of(AuthActions.LogInFailed())),
              )
            }) */
          );
      }),
    ),
  );

  logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LogIn),
      switchMap((action) => {
        return this.authService
          .logIn({
            login: action.login,
            password: action.password,
          })
          .pipe(
            map((value: LoginResponseModel) => AuthActions.LogInSuccess(value)),
            catchError(() => of(AuthActions.LogInFailed())),
            tap(() => this.router.navigateByUrl('')),
          );
      }),
    ),
  );
}
