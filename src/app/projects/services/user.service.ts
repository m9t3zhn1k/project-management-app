import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '@app/shared/models';
import { BehaviorSubject, defer, Observable, of, tap } from 'rxjs';

const lifeTime = 300e3; // min interval for requests to backend - 300 sec

@Injectable()
export class UserService {
  userList: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  private userData: IUser[] = [];

  private requestedAt: number = 0;

  constructor(private http: HttpClient) {
    this.getUsers().subscribe(() => {});
  }

  getUsers(): Observable<IUser[]> {
    const currentTime = new Date().getTime();
    return defer(() =>
      Boolean(currentTime - this.requestedAt > lifeTime)
        ? this.http.get<IUser[]>('users').pipe(
            tap((users) => {
              this.userData = users;
              this.userList.next(users);
              this.requestedAt = currentTime;
            }),
          )
        : of(this.userData),
    );
  }

  getUserById(id: string): IUser {
    const cacheUser = this.userData.find((user) => user._id === id) ?? new IUser('', '', '');
    return cacheUser;
  }
}
