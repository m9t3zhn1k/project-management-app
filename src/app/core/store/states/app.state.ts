import { AuthState, initialAuthState } from '@app/core/store/states/auth.state';

export interface AppState {
  auth: AuthState;
}

export const initialAppState: AppState = {
  auth: initialAuthState,
};
