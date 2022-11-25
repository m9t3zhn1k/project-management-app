import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { IBoard } from '@app/shared/models';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent implements OnChanges {
  @Input() project: IBoard = new IBoard();

  @Output() edit = new EventEmitter();

  @Output() delete = new EventEmitter();

  userList: string[] = [];

  ngOnChanges(): void {
    this.userList = [this.project.owner, ...this.project.users];
  }
}
