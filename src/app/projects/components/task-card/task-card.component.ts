import { Component, Input, OnChanges } from '@angular/core';
import { MockUserName } from '@app/mocks';
import { ITask } from '@app/shared/models';

const CharForBadUsername = '?';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnChanges {
  @Input() task: ITask = new ITask();

  userChar: string = CharForBadUsername;

  userName: string = MockUserName;

  ngOnChanges(): void {
    this.userChar = this.getFirstChar(this.task.userId ?? '');
  }

  getFirstChar(userId: string): string {
    if (!userId) return CharForBadUsername;
    // TODO: get user name from userService
    this.userName = MockUserName;
    return this.userName.length > 1 ? this.userName[0] : CharForBadUsername;
  }

  editTask(): void {
    // TODO: open task edit modal
  }
}
