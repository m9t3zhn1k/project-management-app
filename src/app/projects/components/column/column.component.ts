import { Component, Input, OnChanges } from '@angular/core';
import { IColumnWithTasks } from '@app/shared/models';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnChanges {
  @Input() column: IColumnWithTasks = new IColumnWithTasks();

  color: string = '';

  columnTitle: string = '';

  private currentTitle: string = '';

  ngOnChanges(): void {
    this.columnTitle = this.column.title ?? '';
    this.currentTitle = this.columnTitle;
    this.chooseColor();
  }

  chooseColor(): void {
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

  columnNameChange(): void {
    this.columnTitle = this.columnTitle.trim();
    if (this.columnTitle.length) {
      this.columnTitle = this.currentTitle;
    } else {
      this.currentTitle = this.columnTitle;
    }
    // TODO: save new name
  }

  deleteColumn(): void {
    // TODO: delete column
  }
}
