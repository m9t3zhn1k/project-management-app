import { Injectable, OnDestroy } from '@angular/core';
import { IBoard, IBoardData } from '@app/shared/models';
import { BehaviorSubject, catchError, Observable, Subscription } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userSelector } from '@app/core/store/selectors/auth.selectors';

@Injectable()
export class BoardService implements OnDestroy {
  private boardObj: IBoardData = new IBoardData();

  board: BehaviorSubject<IBoardData> = new BehaviorSubject<IBoardData>(this.boardObj);

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  userData = this.ngrxstore.select(userSelector);

  subscriptions = new Subscription();

  constructor(private http: HttpClient, private router: Router, private ngrxstore: Store) {
    this.subscriptions.add(
      this.userData.subscribe((user) => {
        this.userId = user?.id ?? '';
      }),
    );
  }

  get userId(): string {
    return this.boardObj.owner;
  }

  private set userId(id: string) {
    this.boardObj.owner = id;
  }

  get boardId(): string {
    return this.boardObj._id;
  }

  set boardId(id: string) {
    this.boardObj._id = id;
  }

  get store(): IBoardData {
    return this.boardObj;
  }

  set store(boardData: IBoardData) {
    this.boardObj = boardData;
    this.board.next(this.boardObj);
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
    );
  }

  getAllBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`boardsSet/${this.userId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!error.ok) {
          this.router.navigateByUrl('/error404');
        }
        return [];
      }),
    );
  }

  createBoard(title: string, owner: string, users: string[]): Observable<IBoard> {
    return this.http.post<IBoard>('boards', { title, owner, users });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
