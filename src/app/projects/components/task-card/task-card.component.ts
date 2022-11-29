import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '@app/projects/services/task.service';
import { ITask } from '@app/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit, OnDestroy {
  @Input() task: ITask = new ITask();

  @Output() delete: EventEmitter<ITask> = new EventEmitter();

  userList: string[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.allTasks.subscribe((tasks) => {
      const currTask: ITask = tasks.filter((item) => item._id === this.task._id)[0];
      if (currTask) {
        this.userList = [currTask.userId, ...currTask.users];
      }
    });
  }

  editTask(): void {
    this.taskService.editTask(this.task);
  }

  deleteTask(): void {
    this.delete.emit(this.task);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
