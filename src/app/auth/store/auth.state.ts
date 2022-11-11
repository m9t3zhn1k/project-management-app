import { UserModel } from '../../core/models/user.model';

export interface AuthState {
  user: UserModel | null;
  isLoading: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  isLoading: false,
};
