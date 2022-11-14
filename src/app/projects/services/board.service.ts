import { Injectable } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IBoardData, IColumnWithTasks, ITask } from '@app/shared/models';
import { mockBoards, mockColumns, mockTasks } from '@app/mocks';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BoardService {
  boardObj: IBoardData = new IBoardData();

  board: BehaviorSubject<IBoardData> = new BehaviorSubject<IBoardData>(this.boardObj);

  constructor() {
    this.boardObj = <IBoardData>mockBoards[1];
    this.boardObj.columns = mockColumns.map((item) => {
      const { id, title, order } = item;
      const tasks: ITask[] = mockTasks.map((task) => {
        task.columnId = id;
        return task;
      });
      return { id, title, order, tasks, isNew: false };
    });
    this.board.next(this.boardObj);
  }

  addColumn(): void {
    this.boardObj.columns.push({
      id: `cid00${this.boardObj.columns.length + 1}`,
      title: `New column (${this.boardObj.columns.length + 1})`,
      order: this.boardObj.columns.length,
      tasks: [],
      isNew: true,
    });
    this.board.next(this.boardObj);
    // TODO: save columns
  }

  drop(event: CdkDragDrop<ITask[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    // TODO: save tasks
  }

  dropColumn(event: CdkDragDrop<IColumnWithTasks[]>): void {
    moveItemInArray(this.boardObj.columns, event.previousIndex, event.currentIndex);
    // TODO: save columns
  }

  deleteColumn(id: string): void {
    // TODO: confirmation
    const tempColumns = this.boardObj.columns.filter((column) => column.id !== id);
    if (tempColumns.length < this.boardObj.columns.length) {
      this.boardObj.columns = tempColumns;
    }
  }
}
