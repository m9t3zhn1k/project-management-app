export class IBoard {
  id: string;

  title: string;

  owner?: string;

  users?: Array<string>;

  constructor(id: string = '', title: string = '', owner?: string, users?: Array<string>) {
    this.id = id;
    this.title = title;
    this.owner = owner;
    this.users = users;
  }
}
