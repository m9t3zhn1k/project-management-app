import { UserModel } from '@core/models/user.model';
import { createAction, props } from '@ngrx/store';
import {
  LoginRequestModel,
  SignUpRequestModel,
  LoginResponseModel,
  UpdateUserRequestModel,
  ErrorResponseModel,
} from '@core/models/backend-api.model';

const actionSource: string = '[Auth]';

export const SignUp = createAction(`${actionSource} SignUp`, props<SignUpRequestModel>());

export const SignUpFailed = createAction(`${actionSource} SignUp Failed`, props<ErrorResponseModel>());

export const LogIn = createAction(`${actionSource} LogIn`, props<LoginRequestModel>());

export const LogInSuccess = createAction(`${actionSource} LogIn Success`, props<LoginResponseModel>());

export const LogInFailed = createAction(`${actionSource} LogIn Failed`, props<ErrorResponseModel>());

export const LogOut = createAction(`${actionSource} LogOut`);

export const getUser = createAction(`${actionSource} Get User`, props<LoginResponseModel>());

export const getUserSuccess = createAction(`${actionSource} Get User Success`, props<UserModel>());

export const getUserFailed = createAction(`${actionSource} Get User Failed`);

export const UpdateUser = createAction(`${actionSource} Update User`, props<UpdateUserRequestModel>());

export const UpdateUserSuccess = createAction(`${actionSource} Update User Success`, props<UserModel>());

export const UpdateUserFailed = createAction(`${actionSource} Update User Failed`, props<ErrorResponseModel>());

export const DeleteUser = createAction(`${actionSource} Delete User`);