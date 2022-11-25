import { Component, Input, OnChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IColumn, ITask } from '@app/shared/models';
import { BoardService } from '@app/projects/services/board.service';
import { ColumnService } from '@app/projects/services/column.service';
import { TaskService } from '@app/projects/services/task.service';
import { Subscription, switchMap } from 'rxjs';
import { ConfirmationService } from '@app/shared/confirmation-modal/confirmation.service';
import { ConfirmationTitles } from '@app/shared/confirmation-modal/confirmation-titles';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnChanges {
  @Input() column: IColumn = new IColumn();

  color: string = '';

  columnTitle: string = '';

  tasks: ITask[] = [];

  columnId: string = '';

  itemToRemove: ITask | IColumn = new ITask();

  private currentTitle: string = '';

  disableAutoFocus: boolean = true;

  subscriptions: Subscription = new Subscription();

  constructor(
    private boardService: BoardService,
    private columnService: ColumnService,
    private taskService: TaskService,
    public confirmationService: ConfirmationService,
  ) {}

  ngOnChanges(): void {
    this.columnTitle = this.column.title ?? '';
    if (!this.column._id) {
      this.disableAutoFocus = false;
    }
    this.columnId = this.column._id ?? '';
    this.currentTitle = this.columnTitle;
    this.taskService.allTasks.subscribe((value) => {
      this.tasks = [];
      this.tasks = value.filter((task) => task.columnId === this.columnId);
    });
    this.chooseColor();
  }

  private chooseColor(): void {
    const colorNum = this.columnService.getColor(this.columnId);
    enum Colors {
      indigo,
      red,
      gold,
      blue,
      green,
      orange,
      pink,
    }

    const keys = Object.keys(Colors);
    const realKeys = keys.slice(keys.length / 2, keys.length);
    const random = realKeys[colorNum % (realKeys.length - 1)];

    this.color = `color-${random}`;
  }

  columnNameChange(event?: Event): void {
    if (event) {
      (event.target as HTMLInputElement).blur();
    }
    this.columnTitle = this.columnTitle.trim();
    if (this.columnTitle.length) {
      this.currentTitle = this.columnTitle;
    } else {
      this.columnTitle = this.currentTitle;
    }
    this.columnService.saveColumn(this.column._id, this.columnTitle, this.column.order).subscribe((columnResp) => {
      if (!this.columnId) {
        this.columnId = columnResp._id;
      }
    });
  }

  onOpenConfirmModal(itemToRemove: ITask | IColumn): void {
    this.itemToRemove = itemToRemove;
    this.confirmationService.openModal(ConfirmationTitles.Null);
    this.subscriptions.add(
      this.confirmationService.isModalConfirmed$.subscribe((value: boolean): void => {
        if (value) {
          if ('columnId' in this.itemToRemove) {
            this.deleteTask(this.itemToRemove as ITask);
          } else {
            this.deleteColumn();
          }
        }
      }),
    );
  }

  deleteColumn(): void {
    this.columnService.deleteColumn(this.column._id);
  }

  deleteTask(task: ITask): void {
    this.taskService.deleteTask(task).subscribe((tasks) => {
      this.tasks = tasks.filter((item) => item.columnId === this.columnId);
    });
  }

  drop(event: CdkDragDrop<ITask[]>): void {
    const tasksSet: Pick<ITask, '_id' | 'order' | 'columnId'>[] = [];
    if (event.previousContainer === event.container) {
      if (event.previousIndex === event.currentIndex) {
        return;
      }
      this.boardService.loadingOn();
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    if (event.previousContainer !== event.container) {
      this.boardService.loadingOn();
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      if (event.previousContainer.data.length) {
        event.previousContainer.data.forEach((item, idx) => {
          tasksSet.push({ _id: item._id, order: idx, columnId: event.previousContainer.id });
        });
      }
    }
    event.container.data.forEach((item, idx) => {
      tasksSet.push({ _id: item._id, order: idx, columnId: event.container.id });
    });
    this.taskService
      .updateTasksSet(tasksSet)
      .pipe(switchMap(() => this.taskService.getTasks()))
      .subscribe((tasks) => {
        this.tasks = tasks.filter((task) => task.columnId === event.container.id);
        this.boardService.loadingOff();
      });
  }

  taskRemoved(): void {
    if (this.tasks.length) {
      const tasksSet: Pick<ITask, '_id' | 'order' | 'columnId'>[] = [];
      this.boardService.loadingOn();
      this.tasks.forEach((item, idx) => {
        tasksSet.push({ _id: item._id, order: idx, columnId: this.columnId });
      });
      this.taskService.updateTasksSet(tasksSet).subscribe((tasks) => {
        this.tasks = tasks;
        this.boardService.loadingOff();
      });
    }
  }

  newTask(): void {
    const task = new ITask();
    task.columnId = this.columnId;
    task.boardId = this.column.boardId;
    this.taskService.editTask(task);
  }
}
