import { Component, Input } from '@angular/core';
import { IBoard } from '@app/shared/models';

@Component({
  selector: 'app-user-label',
  templateUrl: './user-label.component.html',
  styleUrls: ['./user-label.component.scss'],
})
export class UserLabelComponent {
  @Input() project!: IBoard;
}
