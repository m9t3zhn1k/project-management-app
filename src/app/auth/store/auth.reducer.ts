import { UserModel } from './../../core/models/user.model';
import { LoginResponseModel } from './../../core/models/backend-api.model';
import { createReducer, on } from '@ngrx/store';
import { initialAuthState, AuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const reducer = createReducer(
  initialAuthState,
  on(
    AuthActions.SignUp,
    (state: AuthState): AuthState => ({
      ...state,
      isPending: true,
    }),
  ),
  on(
    AuthActions.SignUpFailed,
    (state: AuthState): AuthState => ({
      ...state,
      isPending: false,
    }),
  ),
  on(
    AuthActions.LogIn,
    (state: AuthState): AuthState => ({
      ...state,
      isPending: true,
    }),
  ),
  on(
    AuthActions.LogInSuccess,
    (state: AuthState, { user, token }: { user: UserModel; token: LoginResponseModel }): AuthState => ({
      ...state,
      user,
      token: token.token,
      isPending: false,
    }),
  ),
  on(
    AuthActions.LogInFailed,
    (state: AuthState): AuthState => ({
      ...state,
      isPending: false,
    }),
  ),
);
