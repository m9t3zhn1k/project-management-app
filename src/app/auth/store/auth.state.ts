import { UserModel } from '../../core/models/user.model';

export interface AuthState {
  user: UserModel | null;
  token: string | null;
  isPending: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  isPending: false,
};
