import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { AuthService } from './../services/auth.service';

import * as AuthActions from './auth.actions';

import { LoginRequestModel, LoginResponseModel } from '@app/core/models/backend-api.model';
import { UserModel } from './../../core/models/user.model';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

  private signUp$ = createEffect(() =>
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
            map((): LoginRequestModel => ({ login: action.login, password: action.password })),
            map((data: LoginRequestModel) => AuthActions.LogIn(data)),
            catchError(() => of(AuthActions.SignUpFailed())),
          );
      }),
    ),
  );

  private logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LogIn),
      switchMap((action) => {
        return this.authService
          .logIn({
            login: action.login,
            password: action.password,
          })
          .pipe(
            map((data: LoginResponseModel) => AuthActions.getUser(data)),
            catchError(() => of(AuthActions.LogInFailed())),
          );
      }),
    ),
  );

  private getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap((action) => {
        const id: string = this.authService.parseJwt(action).id;
        return this.authService.getUser(id, action.token).pipe(
          map((data: UserModel) => AuthActions.LogInSuccess({ user: data, token: action })),
          tap((data): void => localStorage.setItem('token', JSON.stringify(data.token.token))),
          tap((): Promise<boolean> => this.router.navigateByUrl('')),
          catchError(() => of(AuthActions.LogInFailed())),
        );
      }),
    ),
  );
}
