import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SignUpFormDataModel } from './../models/formData.model';
import { UserModel } from '@app/core/models/user.model';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(data: SignUpFormDataModel): Observable<UserModel> {
    return this.http.post<UserModel>('https://project-management-back-production.up.railway.app/auth/signup', data);
  }
}
