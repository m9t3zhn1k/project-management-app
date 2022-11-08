import { Component } from '@angular/core';
import { IBoard, IColumnWithTasks, ITask } from '@app/shared/models';
import { mockBoards, mockColumns, mockTasks } from '@app/mocks';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent {
  board: IBoard = new IBoard();

  columns: IColumnWithTasks[] = [];

  isModalVisible: boolean = true;

  taskToEdit: ITask = new ITask();

  constructor() {
    this.board = mockBoards[1];
    this.columns = mockColumns.map((item) => {
      const { id, title, order } = item;
      return { id, title, order, tasks: mockTasks };
    });
    // this.taskToEdit = mockTasks[0];
  }

  addColumn(): void {
    // TODO: show column add modal
  }
}
