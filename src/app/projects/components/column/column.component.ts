import { Component, Input, OnChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IColumnWithTasks, ITask } from '@app/shared/models';
import { BoardService } from '@app/projects/services/board.service';
import { ColumnService } from '@app/projects/services/column.service';
import { TaskService } from '@app/projects/services/task.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnChanges {
  @Input() column: IColumnWithTasks = new IColumnWithTasks();

  color: string = '';

  columnTitle: string = '';

  tasks: ITask[] = [];

  columnId: string = '';

  private currentTitle: string = '';

  disableAutoFocus: boolean = true;

  constructor(
    private boardService: BoardService,
    private columnService: ColumnService,
    private taskService: TaskService,
  ) {}

  ngOnChanges(): void {
    this.columnTitle = this.column.title ?? '';
    if (this.column.isNew) {
      this.disableAutoFocus = false;
    }
    this.tasks = this.column.tasks ?? [];
    this.columnId = this.column._id ?? '';
    this.currentTitle = this.columnTitle;
    this.chooseColor();
  }

  private chooseColor(): void {
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
    const random = realKeys[+this.column.order % (realKeys.length - 1)];

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

  deleteColumn(): void {
    this.columnService.deleteColumn(this.column._id);
    // TODO: confirm delete
  }

  deleteTask(task: ITask): void {
    // TODO: confirm
    this.taskService.deleteTask(task).subscribe((tasks) => (this.tasks = tasks));
  }

  drop(event: CdkDragDrop<ITask[]>): void {
    this.boardService.loadingOn();
    const tasksSet: Pick<ITask, '_id' | 'order' | 'columnId'>[] = [];
    const srcTasksSet: Pick<ITask, '_id' | 'order' | 'columnId'>[] = [];
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      if (event.previousContainer.data.length) {
        let srcTasks = [...event.previousContainer.data];
        const srcColumnId = srcTasks[0].columnId;
        srcTasks = srcTasks.map((item, idx) => {
          item.order = idx;
          srcTasksSet.push({ _id: item._id, order: idx, columnId: srcColumnId });
          return item;
        });
        this.taskService.updateTasksSet(srcTasksSet).subscribe(() => {});
      }
    }
    this.tasks.forEach((item, idx) => {
      tasksSet.push({ _id: item._id, order: idx, columnId: this.columnId });
    });
    this.taskService.updateTasksSet(tasksSet).subscribe((tasks) => {
      this.tasks = tasks;
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
