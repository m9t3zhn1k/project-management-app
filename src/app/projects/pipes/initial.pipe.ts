import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../services/user.service';

@Pipe({ name: 'initial' })
export class InitialPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  transform(userId: string): string {
    const user = this.userService.getUserById(userId);
    const char = user.name[0]?.toUpperCase() || '';
    return char;
  }
}
