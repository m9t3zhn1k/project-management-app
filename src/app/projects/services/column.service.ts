import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IColumn, IColumnWithTasks } from '@app/shared/models';
import { iif, Observable, tap } from 'rxjs';
import { BoardService } from './board.service';

@Injectable()
export class ColumnService {
  constructor(private http: HttpClient, private boardService: BoardService) {}

  get columns(): IColumnWithTasks[] {
    return this.boardService.store.columns;
  }

  makeColumnTemplate(): void {
    const tempColumn = [...this.columns];
    tempColumn.push({
      _id: '',
      title: `New column (${tempColumn.length + 1})`,
      order: tempColumn.length,
      tasks: [],
      boardId: this.boardService.boardId,
      isNew: true,
    });
    this.boardService.store.columns = tempColumn;
  }

  getColumnIndexById(columnId: string): number {
    return this.columns.findIndex((column) => column._id === columnId);
  }

  dropColumn(event: CdkDragDrop<IColumnWithTasks[]>): void {
    this.boardService.loadingOn();
    const columnSet: Pick<IColumn, '_id' | 'order'>[] = [];
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    const tempColumn = this.columns.map((item, idx) => {
      columnSet.push({ _id: item._id, order: idx });
      item.order = idx;
      return item;
    });
    this.updateColumnSet(columnSet).subscribe(() => {
      this.boardService.store.columns = tempColumn;
      this.boardService.loadingOff();
    });
  }

  getColumns(): Observable<IColumn[]> {
    return this.http.get<IColumn[]>(`boards/${this.boardService.boardId}/columns`);
  }

  saveColumn(id: string, title: string, order: number): Observable<IColumn> {
    return iif(() => id !== '', this.updateColumn(id, title, order), this.createColumn(title, order)).pipe(
      tap((columnResp) => {
        const tempColumn = [...this.columns];
        if (id) {
          const columnIdx = tempColumn.findIndex((item) => item._id === id);
          if (columnIdx > -1) {
            tempColumn[columnIdx].title = title;
            tempColumn[columnIdx].order = order;
          }
          this.boardService.store.columns = tempColumn;
        } else {
          tempColumn[order]._id = columnResp._id;
          tempColumn[order].title = title;
          tempColumn[order].isNew = false;
          this.boardService.store.columns = tempColumn;
        }
      }),
    );
  }

  createColumn(title: string, order: number): Observable<IColumn> {
    return this.http.post<IColumn>(`boards/${this.boardService.boardId}/columns`, { title, order });
  }

  updateColumn(columnId: string, title: string, order: number): Observable<IColumn> {
    return this.http.put<IColumn>(`boards/${this.boardService.boardId}/columns/${columnId}`, { title, order });
  }

  updateColumnSet(columnSet: Pick<IColumn, '_id' | 'order'>[]): Observable<IColumn[]> {
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
        this.updateColumnSet(columnSet).subscribe(() => {
          this.boardService.store.columns = tempColumns;
        });
      } else if (!tempColumns.length) {
        this.boardService.store.columns = tempColumns;
      }
      // TODO: check for dependent tasks and remove them
      this.boardService.loadingOff();
    });
  }
}
