import { Component } from '@angular/core';
import { IBoard } from '@app/shared/models';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent {
  $projects: IBoard[] = [
    {
      id: '1',
      title: 'First board',
      owner: 'Sam',
      users: ['mike', 'tom'],
    },

    {
      id: '2',
      title: 'Second board',
      owner: 'Tom',
      users: ['Luke', 'Atom'],
    },
    {
      id: '3',
      title: 'Third board',
      owner: 'Tom',
      users: ['Luke', 'Atom'],
    },
    {
      id: '4',
      title: 'Fourth board',
      owner: 'Tom',
      users: ['Luke', 'Atom'],
    },
    {
      id: '5',
      title: 'Fifth board',
      owner: 'Tom',
      users: ['Luke', 'Atom'],
    },
  ];
}
