import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SignUpFormDataModel, LoginFormDataModel } from './../models/formData.model';
import { UserResponseModel } from '../models/user.model';
import { LoginResponseModel } from './../models/login.model';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(data: SignUpFormDataModel): Observable<UserResponseModel> {
    return this.http.post<UserResponseModel>(
      'https://project-management-back-production.up.railway.app/auth/signup',
      data,
    );
  }

  logIn(data: LoginFormDataModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(
      'https://project-management-back-production.up.railway.app/auth/signin',
      data,
    );
  }
}
