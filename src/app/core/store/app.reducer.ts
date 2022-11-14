import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import * as fromAuthReducer from '@auth/store/auth.reducer';

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuthReducer.reducer,
};
