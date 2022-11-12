import { Component, Input, OnChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IColumnWithTasks, ITask } from '@app/shared/models';

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

  ngOnChanges(): void {
    this.columnTitle = this.column.title ?? '';
    if (!this.columnTitle) {
      this.columnTitle = `New column (${this.column.order + 1})`;
      this.disableAutoFocus = false;
    }
    this.tasks = this.column.tasks ?? [];
    this.columnId = this.column.id ?? '';
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

    // TODO: save new name
    if (!this.column.id) {
      // post column
    } else {
      // put changes
    }
  }

  deleteColumn(): void {
    // TODO: delete column
  }

  drop(event: CdkDragDrop<ITask[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    // TODO: save tasks order changes
  }
}
