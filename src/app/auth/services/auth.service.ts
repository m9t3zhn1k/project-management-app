import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { TokenModel } from '@core/models/backend-api.model';
import { UserModel } from '@core/models/user.model';
import {
  SignUpRequestModel,
  LoginRequestModel,
  SignUpResponseModel,
  LoginResponseModel,
} from '@app/core/models/backend-api.model';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(data: SignUpRequestModel): Observable<SignUpResponseModel> {
    return this.http.post<SignUpResponseModel>(
      'https://project-management-back-production.up.railway.app/auth/signup',
      data,
    );
  }

  logIn(data: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(
      'https://project-management-back-production.up.railway.app/auth/signin',
      data,
    );
  }

  parseJwt({token}: LoginResponseModel): TokenModel {
    const base64Url: string = token.split('.')[1];
    const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload: string = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c: string): string {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
    return JSON.parse(jsonPayload);
  }

  getUser(id: string, token: string): Observable<UserModel> {
    return this.http
      .get<SignUpResponseModel>(`https://project-management-back-production.up.railway.app/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        map(
          (resp: SignUpResponseModel): UserModel => ({
            id: resp._id,
            login: resp.login,
            name: resp.name,
          }),
        ),
      );
  }
}
