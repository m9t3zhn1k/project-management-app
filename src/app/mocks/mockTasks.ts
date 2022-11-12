import { ITask } from '../shared/models';

export const mockTasks: ITask[] = [
  {
    id: 'tid1',
    title: 'Task one',
    order: 0,
    description: 'description 1',
    userId: 'uid1',
    boardId: 'bid1',
    columnId: 'id1',
    files: [],
  },
  {
    id: 'tid2',
    title: 'Task two',
    order: 1,
    description: 'description 2',
    userId: 'uid1',
    boardId: 'bid1',
    columnId: 'id1',
    files: [],
  },
  {
    id: 'tid3',
    title: 'Last one',
    order: 2,
    description: 'Long time ago... ',
    userId: 'uid1',
    boardId: 'bid1',
    columnId: 'id1',
    files: [],
  },
];
