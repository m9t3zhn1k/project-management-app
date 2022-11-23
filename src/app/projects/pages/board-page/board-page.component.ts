import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { IBoardData, IColumnWithTasks, ITask } from '@app/shared/models';
import { BoardService } from '@app/projects/services/board.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '@app/projects/services/task.service';
import { ColumnService } from '@app/projects/services/column.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  board: IBoardData = new IBoardData();

  isModalVisible: boolean = false;

  taskToEdit: ITask = new ITask();

  private subscriptions: Subscription = new Subscription();

  isLoading = this.boardService.isLoading;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private columnService: ColumnService,
    private taskService: TaskService,
  ) {
    this.subscriptions.add(
      this.boardService.board.subscribe((board) => {
        this.board = board;
      }),
    );

    this.subscriptions.add(
      this.taskService.task.subscribe((task) => {
        this.taskToEdit = task;
        this.isModalVisible = true;
      }),
    );
  }

  ngOnInit(): void {
    this.taskService.init(this.route.snapshot.params.id ?? '');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addColumn(): void {
    this.columnService.makeColumnTemplate();
  }

  drop(event: CdkDragDrop<IColumnWithTasks[]>): void {
    this.columnService.dropColumn(event);
  }

  // TODO: remove method + btn in tpl
  // createBoard(): void {
  //   this.boardService
  //     .createBoard('Board One', '637800739aff3701accf77b1', ['637803819aff3701accf77bf', '637802919aff3701accf77b9'])
  //     .subscribe(() => {});
  // }
}
