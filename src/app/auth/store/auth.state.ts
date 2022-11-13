import { UserResponseModel } from '../models/user.model';
import { LoginResponseModel } from '../models/login.model';

export interface AuthState {
  user: UserResponseModel | null;
  isLoading: boolean;
  token: LoginResponseModel | null;
}

export const initialAuthState: AuthState = {
  user: null,
  isLoading: false,
  token: null,
};
