import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss'],
})
export class EditUserPageComponent {
  @HostBinding('class') class = 'page';
}
