import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-label',
  templateUrl: './user-label.component.html',
  styleUrls: ['./user-label.component.scss'],
})
export class UserLabelComponent {
  @Input() userList: string[] = [];
}
