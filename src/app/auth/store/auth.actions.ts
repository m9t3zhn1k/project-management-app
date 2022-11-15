import { UserModel } from './../../core/models/user.model';
import { createAction, props } from '@ngrx/store';
import { LoginRequestModel, SignUpRequestModel, LoginResponseModel } from './../../core/models/backend-api.model';

const actionSource: string = '[Auth]';

export const SignUp = createAction(`${actionSource} SignUp`, props<SignUpRequestModel>());

export const SignUpFailed = createAction(`${actionSource} SignUp Failed`);

export const LogIn = createAction(`${actionSource} LogIn`, props<LoginRequestModel>());

export const LogInSuccess = createAction(
  `${actionSource} LogIn Success`,
  props<{ user: UserModel; token: LoginResponseModel }>(),
);

export const LogInFailed = createAction(`${actionSource} LogIn Failed`);

export const getUser = createAction(`${actionSource} GetUser`, props<LoginResponseModel>());
