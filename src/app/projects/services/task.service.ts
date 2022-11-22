import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBoardData, IColumnWithTasks, ITask } from '@app/shared/models';
import { mergeMap, Observable, Subject, tap } from 'rxjs';
import { BoardService } from './board.service';
import { ColumnService } from './column.service';

@Injectable()
export class TaskService {
  task: Subject<ITask> = new Subject<ITask>();

  constructor(private http: HttpClient, private boardService: BoardService, private columnService: ColumnService) {}

  init(boardId: string): void {
    this.boardService
      .getBoard(boardId)
      .pipe(
        tap((board) => (this.boardService.store = <IBoardData>board)),
        mergeMap(() => this.columnService.getColumns()),
        tap(
          (columns) =>
            (this.boardService.store.columns = columns
              .sort((a, b) => a.order - b.order)
              .map((item) => {
                const result = <IColumnWithTasks>item;
                result.tasks = [];
                result.isNew = false;
                return result;
              })),
        ),
        mergeMap(() => this.getTasks()),
      )
      .subscribe((tasks) => {
        tasks
          .sort((a, b) => a.order - b.order)
          .forEach((task) => {
            const columnIdx = this.boardService.store.columns.findIndex((item) => item._id === task.columnId);
            if (columnIdx > -1) {
              this.boardService.store.columns[columnIdx].tasks.push(task);
            }
          });
        this.boardService.loadingOff();
      });
  }

  editTask(task: ITask): void {
    if (!task.userId) {
      task.userId = this.boardService.userId;
    }
    this.task.next(task);
  }

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`tasksSet/${this.boardService.boardId}`);
  }

  createTask(task: ITask): Observable<ITask> {
    const { title, order, description, userId, users } = task;
    return this.http.post<ITask>(`boards/${this.boardService.boardId}/columns/${task.columnId}/tasks`, {
      title,
      order,
      description,
      userId,
      users,
    });
  }

  updateTask(task: ITask): Observable<ITask> {
    const { title, order, columnId, description, userId, users } = task;
    return this.http.put<ITask>(`boards/${this.boardService.boardId}/columns/${task.columnId}/tasks/${task._id}`, {
      title,
      order,
      columnId,
      description,
      userId,
      users,
    });
  }

  deleteTask(task: ITask): Observable<ITask[]> {
    this.boardService.loadingOn();
    const endpoint = `boards/${this.boardService.boardId}/columns/${task.columnId}/tasks/${task._id}`;
    const columnIdx = this.columnService.getColumnIndexById(task.columnId);
    const tempColumn = this.columnService.columns[columnIdx];
    const tasksSet: Pick<ITask, '_id' | 'order' | 'columnId'>[] = [];
    const taskList = tempColumn.tasks
      .filter((item) => item._id !== task._id)
      .map((item, idx) => {
        item.order = idx;
        tasksSet.push({ _id: item._id, order: item.order, columnId: item.columnId });
        return item;
      });
    return this.http.delete<Response>(endpoint).pipe(
      mergeMap(() => {
        if (taskList.length) {
          return this.updateTasksSet(tasksSet);
        } else {
          return this.getTasks();
        }
      }),
      tap(() => this.boardService.loadingOff()),
    );
  }

  updateTasksSet(tasksSet: Pick<ITask, '_id' | 'order' | 'columnId'>[]): Observable<ITask[]> {
    return this.http.patch<ITask[]>('tasksSet', tasksSet);
  }

  saveTask(task: ITask): void {
    if (!task.description) {
      task.description = ' ';
    }
    const columnIdx = this.columnService.getColumnIndexById(task.columnId);
    if (columnIdx > -1) {
      const taskIdx = this.columnService.columns[columnIdx].tasks.findIndex((item) => (item._id = task._id));
      this.boardService.loadingOn();
      if (taskIdx > -1) {
        this.updateTask(task).subscribe(() => {
          this.boardService.loadingOff();
        });
      } else {
        task.order = this.columnService.columns[columnIdx].tasks.length;
        this.createTask(task).subscribe((taskResp) => {
          task._id = taskResp._id;
          this.columnService.columns[columnIdx].tasks.push(task);
          this.boardService.loadingOff();
        });
      }
    }
  }
}
