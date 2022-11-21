import { Injectable } from '@angular/core';
import { IBoard, IBoardData } from '@app/shared/models';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class BoardService {
  private boardObj: IBoardData = new IBoardData();

  board: BehaviorSubject<IBoardData> = new BehaviorSubject<IBoardData>(this.boardObj);

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient, private router: Router) {}

  get userId(): string {
    return this.boardObj.owner;
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

  createBoard(title: string, owner: string, users: string[]): Observable<IBoard> {
    return this.http.post<IBoard>('boards', { title, owner, users });
  }
}
