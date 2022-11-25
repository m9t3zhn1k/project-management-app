import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { IBoard, IColumn, ITask } from '@app/shared/models';
import { BoardService } from '@app/projects/services/board.service';
import { Subject, Subscription, tap, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '@app/projects/services/task.service';
import { ColumnService } from '@app/projects/services/column.service';
import { UserService } from '@app/projects/services/user.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnDestroy, OnInit {
  board: Subject<IBoard> = new Subject<IBoard>();

  boardId: string = this.route.snapshot.params.id ?? '';

  columns: Subject<IColumn[]> = new Subject<IColumn[]>();

  userList: string[] = [];

  isModalVisible: boolean = false;

  taskToEdit: ITask = new ITask();

  private subscriptions: Subscription = new Subscription();

  isLoading = this.boardService.isLoading;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private columnService: ColumnService,
    private userService: UserService,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    let tmpBoard: IBoard;
    this.subscriptions.add(
      this.boardService
        .getBoard(this.boardId)
        .pipe(
          tap((board) => {
            this.board.next(board);
            tmpBoard = board;
          }),
          switchMap(() => this.userService.getUsers()),
          switchMap(() => {
            this.userList = [tmpBoard.owner, ...tmpBoard.users];
            return this.taskService.getTasks();
          }),
          switchMap(() => this.columnService.getColumns()),
          switchMap((columns) => {
            this.columns.next(columns);
            return this.columnService.allColumns;
          }),
        )
        .subscribe((columns) => {
          this.columns.next(columns);
          this.boardService.loadingOff();
        }),
    );
    this.subscriptions.add(
      this.taskService.task.subscribe((task) => {
        this.taskToEdit = task;
        this.isModalVisible = true;
      }),
    );
    this.subscriptions.add(this.columnService.allColumns.subscribe((columns) => this.columns.next(columns)));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addColumn(): void {
    this.columnService.makeColumnTemplate();
  }

  drop(event: CdkDragDrop<IColumn[]>): void {
    this.columnService.dropColumn(event);
  }
}
