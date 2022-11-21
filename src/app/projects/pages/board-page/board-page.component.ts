import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { IBoardData, IColumnWithTasks, ITask } from '@app/shared/models';
import { BoardService } from '@app/projects/services/board.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent {
  board: IBoardData = new IBoardData();

  isModalVisible: boolean = false;

  taskToEdit: ITask = new ITask();

  constructor(private boardService: BoardService) {
    this.boardService.board.subscribe((board) => {
      this.board = board;
    });
  }

  addColumn(): void {
    this.boardService.addColumn();
  }

  drop(event: CdkDragDrop<IColumnWithTasks[]>): void {
    this.boardService.dropColumn(event);
  }
}
