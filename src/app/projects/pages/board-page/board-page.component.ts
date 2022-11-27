import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { IBoard, IColumn, ITask } from '@app/shared/models';
import { BoardService } from '@app/projects/services/board.service';
import { Subject, BehaviorSubject, Subscription, tap, switchMap, debounceTime } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '@app/projects/services/task.service';
import { ColumnService } from '@app/projects/services/column.service';
import { UserService } from '@app/projects/services/user.service';
import { FormControl, FormGroup } from '@angular/forms';

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

  isBoardModalVisible: boolean = false;

  taskToEdit: ITask = new ITask();

  boardToEdit: IBoard = new IBoard();

  private subscriptions: Subscription = new Subscription();

  isLoading = this.boardService.isLoading;

  searchForm: FormGroup = new FormGroup({
    search: new FormControl<string>(''),
  });

  searchTerm: string = '';

  isOwner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private columnService: ColumnService,
    private userService: UserService,
    private taskService: TaskService,
  ) {}

  doSearch(): void {
    this.boardService.setSearch(this.searchTerm);
  }

  subscribeForFormValueChanges(): void {
    this.subscriptions.add(
      this.searchForm
        .get('search')
        ?.valueChanges.pipe(debounceTime(300))
        .subscribe((value) => {
          this.searchTerm = value;
          this.doSearch();
        }),
    );
  }

  subscribeForUsers(): void {
    this.subscriptions.add(
      this.board.subscribe((value) => {
        this.userList = [value.owner, ...value.users];
      }),
    );
  }

  subscribeForEditTask(): void {
    this.subscriptions.add(
      this.taskService.task.subscribe((task) => {
        this.taskToEdit = task;
        this.isModalVisible = true;
      }),
    );
  }

  subscribeForBoard(): void {
    this.subscriptions.add(
      this.boardService.board.subscribe((value) => {
        this.board.next(value);
      }),
    );
  }

  subscribeForSequence(): void {
    this.subscriptions.add(
      this.boardService
        .getBoard(this.boardId)
        .pipe(
          tap((board) => {
            this.board.next(board);
            this.boardToEdit = board;
            this.isOwner.next(this.boardService.currentUser._id === this.boardService.owner);
          }),
          switchMap(() => this.userService.getUsers()),
          switchMap(() => this.taskService.getTasks()),
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
  }

  ngOnInit(): void {
    this.subscribeForUsers();
    this.subscribeForFormValueChanges();
    this.subscribeForSequence();
    this.subscribeForEditTask();
    this.subscribeForBoard();
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

  editBoard(): void {
    this.isBoardModalVisible = true;
  }
}
