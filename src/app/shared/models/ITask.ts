export class ITask {
  id: string = '';

  title: string = '';

  order: number = 0;

  description: string = '';

  userId: string = '';

  boardId: string = '';

  columnId: string = '';

  files: {
    filename: string;
    fileSize: number;
  }[] = [];
}
