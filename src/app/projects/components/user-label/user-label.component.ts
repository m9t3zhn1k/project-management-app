import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { UserService } from '@app/projects/services/user.service';
import { IBoard, ITask } from '@app/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-label',
  templateUrl: './user-label.component.html',
  styleUrls: ['./user-label.component.scss'],
})
export class UserLabelComponent implements OnChanges, OnDestroy {
  @Input() usersContainer: IBoard | ITask | null = null;

  userList: string[] = [];

  constructor(private userService: UserService) {}

  subscriptions: Subscription = new Subscription();

  ngOnChanges(): void {
    if (this.usersContainer) {
      let owner: string = '';
      if ('owner' in this.usersContainer) {
        owner = this.usersContainer?.owner;
      } else {
        owner = this.usersContainer?.userId;
      }
      const users = [owner, ...this.usersContainer.users];
      this.userService.allUsers.subscribe(() => {
        this.userList = users;
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
