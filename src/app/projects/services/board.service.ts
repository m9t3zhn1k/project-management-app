import { Injectable } from '@angular/core';
import { IBoard, IUser } from '@app/shared/models';
import { BehaviorSubject, catchError, Observable, Subject, tap, map } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userSelector } from '@app/core/store/selectors/auth.selectors';

@Injectable()
export class BoardService {
  private boardObj: IBoard = new IBoard();

  boards: IBoard[] = [];

  board: BehaviorSubject<IBoard> = new BehaviorSubject<IBoard>(this.boardObj);

  search: Subject<string> = new Subject();

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private _trigger: Subject<boolean> = new Subject<boolean>();

  trigger$: Observable<boolean> = this._trigger.asObservable();

  private readonly userData = this.store.select(userSelector);

  currentUser: IUser = new IUser('', '', '');

  constructor(private http: HttpClient, private router: Router, private readonly store: Store) {
    this.userData
      .pipe(
        map((user): IUser => {
          if (user) {
            return { _id: user.id, name: user.name, login: user.login };
          }
          return new IUser('', '', '');
        }),
      )
      .subscribe((user) => {
        this.currentUser = user;
      });
  }

  setSearch(value: string): void {
    this.search.next(value);
  }

  get owner(): string {
    return this.boardObj.owner;
  }

  get users(): string[] {
    return this.boardObj.users;
  }

  private set owner(id: string) {
    this.boardObj.owner = id;
  }

  get boardId(): string {
    return this.boardObj._id;
  }

  loadingOn(): void {
    this.isLoading.next(true);
  }

  loadingOff(): void {
    this.isLoading.next(false);
  }

  getBoard(id: string): Observable<IBoard> {
    return this.http.get<IBoard>(`boards/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!error.ok) {
          this.router.navigateByUrl('/error404');
        }
        return [];
      }),
      tap((value) => {
        this.boardObj._id = value._id;
        this.boardObj.title = value.title;
        this.boardObj.owner = value.owner;
        this.owner = value.owner;
        this.boardObj.users = value.users;
        this.board.next(this.boardObj);
      }),
    );
  }

  get allBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`boardsSet/${this.currentUser._id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!error.ok) {
          this.router.navigateByUrl('/error404');
        }
        return [];
      }),
      tap((boards) => (this.boards = boards)),
    );
  }

  updateBoard(board: IBoard): Observable<IBoard> {
    const { title, owner, users } = board;
    return this.http.put<IBoard>(`boards/${board._id}`, { title, owner, users }).pipe(
      tap((value) => {
        this.boardObj = value;
        this.board.next(value);
      }),
    );
  }

  deleteBoard(boardId: string): Observable<Response> {
    return this.http.delete<Response>(`boards/${boardId}`);
  }

  createBoard(board: IBoard): Observable<IBoard> {
    const { title, owner, users } = board;
    return this.http.post<IBoard>('boards', { title, owner, users });
  }

  onNewBoardButton(isOpenModal: boolean): void {
    console.log(isOpenModal);
    this._trigger.next(isOpenModal);
  }
}
