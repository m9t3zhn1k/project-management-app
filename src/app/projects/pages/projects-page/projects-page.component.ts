import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoardService } from '@app/projects/services/board.service';
import { UserService } from '@app/projects/services/user.service';
import { IBoard } from '@app/shared/models';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent implements OnInit, OnDestroy {
  boards: Observable<IBoard[]> = this.boardService.getAllBoards();

  constructor(private boardService: BoardService, private userService: UserService) {}

  subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(this.userService.allUsers.subscribe(() => {}));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
