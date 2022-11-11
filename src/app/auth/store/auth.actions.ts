import { createAction, props } from '@ngrx/store';

import { SignUpFormDataModel } from '../models/formData.model';
import { UserModel } from '@app/core/models/user.model';

const actionSource: string = '[Auth]';

export const SignUp = createAction(`${actionSource} SignUp`, props<SignUpFormDataModel>());

export const SignUpSuccess = createAction(`${actionSource} SignUp Success`, props<{ user: UserModel }>());

export const SignUpFailed = createAction(`${actionSource} SignUp Failed`);
