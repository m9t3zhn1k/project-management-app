import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { BoardService } from '@app/projects/services/board.service';
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

  isOwner: boolean = false;

  constructor(private boardService: BoardService) {}

  ngOnChanges(): void {
    this.userList = [this.project.owner, ...this.project.users];
    this.isOwner = this.boardService.currentUser._id === this.project.owner;
  }
}
