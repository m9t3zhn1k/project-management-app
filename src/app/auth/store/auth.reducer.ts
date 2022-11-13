import { createReducer, on } from '@ngrx/store';
import { initialAuthState, AuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const reducer = createReducer(
  initialAuthState,
  on(
    AuthActions.SignUp,
    (state: AuthState): AuthState => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    AuthActions.SignUpSuccess,
    (state: AuthState, { user }): AuthState => ({
      ...state,
      user,
      isLoading: false,
    }),
  ),
  on(
    AuthActions.SignUpFailed,
    (state: AuthState): AuthState => ({
      ...state,
      user: null,
      isLoading: false,
    }),
  ),
  on(
    AuthActions.LogIn,
    (state: AuthState): AuthState => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    AuthActions.LogInSuccess,
    (state: AuthState, token): AuthState => ({
      ...state,
      token,
      isLoading: false,
    }),
  ),
  on(
    AuthActions.LogInFailed,
    (state: AuthState): AuthState => ({
      ...state,
      token: null,
      isLoading: false,
    }),
  ),
);
