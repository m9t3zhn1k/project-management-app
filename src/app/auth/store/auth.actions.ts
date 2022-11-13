import { createAction, props } from '@ngrx/store';

import { SignUpFormDataModel, LoginFormDataModel } from '../models/formData.model';
import { UserResponseModel } from '../models/user.model';
import { LoginResponseModel } from '../models/login.model';

const actionSource: string = '[Auth]';

export const SignUp = createAction(`${actionSource} SignUp`, props<SignUpFormDataModel>());

export const SignUpSuccess = createAction(`${actionSource} SignUp Success`, props<{ user: UserResponseModel }>());

export const SignUpFailed = createAction(`${actionSource} SignUp Failed`);

export const LogIn = createAction(`${actionSource} LogIn`, props<LoginFormDataModel>());

export const LogInSuccess = createAction(`${actionSource} LogIn Success`, props<LoginResponseModel>());

export const LogInFailed = createAction(`${actionSource} LogIn Failed`);
