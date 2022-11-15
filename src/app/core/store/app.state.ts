import { AuthState, initialAuthState } from '@auth/store/auth.state';

export interface AppState {
  auth: AuthState;
}

export const initialAppState: AppState = {
  auth: initialAuthState,
};
