import { Component } from '@angular/core';
import { IBoard } from '@app/shared/models';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent {
  $projects: IBoard[] = Array(100).fill({
    id: '1',
    title: 'First board',
    owner: 'Sam',
    users: ['mike', 'tom'],
  });
}
