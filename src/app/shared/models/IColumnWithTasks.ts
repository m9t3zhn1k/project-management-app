import { IColumn } from './IColumn';
import { ITask } from './ITask';

export class IColumnWithTasks extends IColumn {
  tasks: ITask[] = [];

  isNew: boolean = true;
}
