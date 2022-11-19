import { UserModel } from '@core/models/user.model';
import { createAction, props } from '@ngrx/store';
import {
  LoginRequestModel,
  SignUpRequestModel,
  LoginResponseModel,
  UpdateUserRequestModel,
} from '@core/models/backend-api.model';

const actionSource: string = '[Auth]';

export const SignUp = createAction(`${actionSource} SignUp`, props<SignUpRequestModel>());

export const SignUpFailed = createAction(`${actionSource} SignUp Failed`);

export const LogIn = createAction(`${actionSource} LogIn`, props<LoginRequestModel>());

export const LogInSuccess = createAction(`${actionSource} LogIn Success`, props<LoginResponseModel>());

export const LogInFailed = createAction(`${actionSource} LogIn Failed`);

export const LogOut = createAction(`${actionSource} LogOut`);

export const getUser = createAction(`${actionSource} Get User`, props<LoginResponseModel>());

export const getUserSuccess = createAction(`${actionSource} Get User Success`, props<UserModel>());

export const UpdateUser = createAction(`${actionSource} Update User`, props<UpdateUserRequestModel>());

export const UpdateUserSuccess = createAction(`${actionSource} Update User Success`, props<UserModel>());

export const DeleteUser = createAction(`${actionSource} Delete User`);
