import { IBoard } from './IBoard';
import { IColumnWithTasks } from './IColumnWithTasks';

export class IBoardData extends IBoard {
  columns: IColumnWithTasks[] = [];
}
