import { Injectable } from '@angular/core';
import { IBoard } from '@app/shared/models';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userSelector } from '@app/core/store/selectors/auth.selectors';

@Injectable()
export class BoardService {
  private boardObj: IBoard = new IBoard();

  boards: IBoard[] = [];

  board: BehaviorSubject<IBoard> = new BehaviorSubject<IBoard>(this.boardObj);

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private readonly userData = this.store.select(userSelector);

  constructor(private http: HttpClient, private router: Router, private readonly store: Store) {
    this.userData.subscribe((user) => {
      this.owner = user?.id ?? '';
    });
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
        this.boardObj.users = value.users;
        this.board.next(this.boardObj);
      }),
    );
  }

  get allBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`boardsSet/${this.owner}`).pipe(
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
    return this.http.put<IBoard>(`boards/${board._id}`, { title, owner, users });
  }

  deleteBoard(boardId: string): Observable<Response> {
    return this.http.delete<Response>(`boards/${boardId}`);
  }

  createBoard(board: IBoard): Observable<IBoard> {
    const { title, owner, users } = board;
    return this.http.post<IBoard>('boards', { title, owner, users });
  }
}
