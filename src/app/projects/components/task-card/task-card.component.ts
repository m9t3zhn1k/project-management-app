import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { mockUsers } from '@app/mocks';
import { BoardService } from '@app/projects/services/board.service';
import { TaskService } from '@app/projects/services/task.service';
import { ITask } from '@app/shared/models';

const charForBadUsername = '?';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnChanges {
  @Input() task: ITask = new ITask();

  @Output() delete: EventEmitter<ITask> = new EventEmitter();

  userChar: string = charForBadUsername;

  userName: string = '';

  constructor(private boardService: BoardService, private taskService: TaskService) {}

  ngOnChanges(): void {
    // TODO: change owner sign to task users
    this.userChar = this.getFirstChar(this.task.userId ?? '');
  }

  getFirstChar(userId: string): string {
    if (!userId) {
      return charForBadUsername;
    }
    // TODO: get user name from userService
    this.userName = mockUsers[1].name;
    return this.userName.length > 1 ? this.userName[0] : charForBadUsername;
  }

  editTask(): void {
    this.taskService.editTask(this.task);
  }

  deleteTask(): void {
    // TODO: delete task
    this.delete.emit(this.task);
  }
}
