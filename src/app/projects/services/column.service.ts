import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IColumn } from '@app/shared/models';
import { BehaviorSubject, defer, map, Observable, tap } from 'rxjs';
import { BoardService } from './board.service';

@Injectable()
export class ColumnService {
  constructor(private http: HttpClient, private boardService: BoardService) {}

  allColumns: BehaviorSubject<IColumn[]> = new BehaviorSubject<IColumn[]>([]);

  private columnStore: IColumn[] = [];

  private colorsColumn: string[] = [];

  get columns(): IColumn[] {
    return this.columnStore;
  }

  set columns(value: IColumn[]) {
    this.columnStore = value;
  }

  getColor(columnId: string): number {
    let result: number;
    if (this.colorsColumn.includes(columnId)) {
      result = this.colorsColumn.findIndex((item) => item === columnId);
    } else {
      this.colorsColumn.push(columnId);
      result = this.colorsColumn.length - 1;
    }
    return result;
  }

  makeColumnTemplate(): void {
    this.getColumns().subscribe((columns) => {
      columns.push({
        _id: '',
        title: `New column (${columns.length + 1})`,
        order: columns.length,
        boardId: this.boardService.boardId,
      });
      this.allColumns.next(columns);
    });
  }

  dropColumn(event: CdkDragDrop<IColumn[]>): void {
    this.boardService.loadingOn();
    const columnSet: Pick<IColumn, '_id' | 'order'>[] = [];
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.columns.forEach((item, idx) => {
      columnSet.push({ _id: item._id, order: idx });
    });
    this.updateColumnSet(columnSet).subscribe((columns) => {
      this.columns = columns;
      this.allColumns.next(columns);
      this.boardService.loadingOff();
    });
  }

  getColumns(): Observable<IColumn[]> {
    return this.http.get<IColumn[]>(`boards/${this.boardService.boardId}/columns`).pipe(
      map((columns) => {
        return columns.sort((a, b) => a.order - b.order);
      }),
      tap((value) => {
        this.columns = value;
        this.allColumns.next(value);
        this.boardService.loadingOff();
      }),
    );
  }

  saveColumn(id: string, title: string, order: number): Observable<IColumn> {
    return defer(() => (Boolean(id) ? this.updateColumn(id, title, order) : this.createColumn(title, order)));
  }

  private createColumn(title: string, order: number): Observable<IColumn> {
    return this.http.post<IColumn>(`boards/${this.boardService.boardId}/columns`, { title, order }).pipe(
      tap((column) => {
        this.columns[this.columns.length - 1] = column;
        this.allColumns.next(this.columns);
        this.boardService.loadingOff();
      }),
    );
  }

  private updateColumn(columnId: string, title: string, order: number): Observable<IColumn> {
    return this.http.put<IColumn>(`boards/${this.boardService.boardId}/columns/${columnId}`, { title, order }).pipe(
      tap((column) => {
        this.columns = this.columns.map((item) => {
          if (item._id === column._id) {
            return column;
          }
          return item;
        });
        this.allColumns.next(this.columns);
        this.boardService.loadingOff();
      }),
    );
  }

  private updateColumnSet(columnSet: Pick<IColumn, '_id' | 'order'>[]): Observable<IColumn[]> {
    return this.http.patch<IColumn[]>('columnsSet', columnSet);
  }

  deleteColumn(columnId: string): void {
    this.boardService.loadingOn();
    this.http.delete<Response>(`boards/${this.boardService.boardId}/columns/${columnId}`).subscribe(() => {
      const columnSet: Pick<IColumn, '_id' | 'order'>[] = [];
      const tempColumns = this.columns
        .filter((column) => column._id !== columnId)
        .map((item, idx) => {
          item.order = idx;
          columnSet.push({ _id: item._id, order: item.order });
          return item;
        });
      if (tempColumns.length && tempColumns.length < this.columns.length) {
        this.updateColumnSet(columnSet).subscribe((columns) => {
          this.columns = columns;
          this.allColumns.next(this.columns);
          this.boardService.loadingOff();
        });
      } else if (!tempColumns.length) {
        this.columns = [];
        this.allColumns.next(this.columns);
        this.boardService.loadingOff();
      }
    });
  }
}
