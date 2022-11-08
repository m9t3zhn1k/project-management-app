import { Component, Input, OnChanges } from '@angular/core';
import { mockUserName } from '@app/mocks';
import { ITask } from '@app/shared/models';

const charForBadUsername = '?';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnChanges {
  @Input() task: ITask = new ITask();

  userChar: string = charForBadUsername;

  userName: string = mockUserName;

  ngOnChanges(): void {
    this.userChar = this.getFirstChar(this.task.userId ?? '');
  }

  getFirstChar(userId: string): string {
    if (!userId) {
      return charForBadUsername;
    }
    // TODO: get user name from userService
    this.userName = mockUserName;
    return this.userName.length > 1 ? this.userName[0] : charForBadUsername;
  }

  editTask(): void {
    // TODO: open task edit modal
  }
}
