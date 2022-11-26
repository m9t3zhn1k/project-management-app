import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../services/user.service';

@Pipe({ name: 'userName' })
export class UserNamePipe implements PipeTransform {
  constructor(private userService: UserService) {}

  transform(userId: string): string {
    const user = this.userService.getUserById(userId);
    return user.name;
  }
}
