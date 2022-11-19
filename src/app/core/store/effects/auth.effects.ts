import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { switchMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from '@auth/services/auth.service';

import * as AuthActions from '../actions/auth.actions';

import { LoginRequestModel, LoginResponseModel } from '@core/models/backend-api.model';
import { UserModel } from '@core/models/user.model';

import { userSelector } from '@app/core/store/selectors/auth.selectors';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store,
  ) {}

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
            tap((data: LoginResponseModel): void => localStorage.setItem('token', data.token)),
            map((data: LoginResponseModel) => AuthActions.LogInSuccess(data)),
            catchError(() => of(AuthActions.LogInFailed())),
          );
      }),
    ),
  );

  private logInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LogInSuccess),
      map((data: LoginResponseModel) => AuthActions.getUser(data)),
    ),
  );

  private logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LogOut),
        tap(() => localStorage.clear()),
        tap(() => this.router.navigateByUrl('')),
      ),
    { dispatch: false },
  );

  private getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap((action) => {
        const id: string = this.authService.parseJwt(action).id;
        return this.authService.getUser(id).pipe(
          tap((user: UserModel) => localStorage.setItem('user', JSON.stringify(user))),
          map((user: UserModel) => AuthActions.getUserSuccess(user)),
          catchError(() => of(AuthActions.LogInFailed())),
        );
      }),
    ),
  );

  private getUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.getUserSuccess),
        tap((): void => {
          if (this.router.url === '/auth/login' || this.router.url === '/auth/sign-up') {
            this.router.navigateByUrl('');
          }
        }),
      ),
    { dispatch: false },
  );

  private updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.UpdateUser),
      concatLatestFrom((): Observable<UserModel | null> => this.store.select(userSelector)),
      mergeMap(([action, user]) => {
        return this.authService
          .updateUser(user?.id!, { name: action.name, login: action.login, password: action.password })
          .pipe(
            tap((response: UserModel) => localStorage.setItem('user', JSON.stringify(response))),
            map((response: UserModel) => AuthActions.UpdateUserSuccess(response)),
          );
      }),
    ),
  );

  private deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.DeleteUser),
      concatLatestFrom((): Observable<UserModel | null> => this.store.select(userSelector)),
      mergeMap(([, user]) => {
        return this.authService.deleteUser(user?.id!).pipe(map(() => AuthActions.LogOut()));
      }),
    ),
  );
}
