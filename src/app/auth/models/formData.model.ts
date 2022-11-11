export interface LoginFormDataModel {
  login: string;
  password: string;
}

export interface SignUpFormDataModel extends LoginFormDataModel {
  name: string;
}
