import { Component, Input } from '@angular/core';
import { IBoard } from '@app/shared/models';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent {
  @Input() project!: IBoard;
}
