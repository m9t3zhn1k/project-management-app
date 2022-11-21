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
      _id: '637811ec9aff3701accf7811',
      title: 'Board one',
      owner: 'Sam',
      users: ['mike', 'tom'],
    },

    {
      _id: '2',
      title: 'Second board',
      owner: 'Tom',
      users: ['Luke', 'Atom'],
    },
    {
      _id: '3',
      title: 'Third board',
      owner: 'Tom',
      users: ['Luke', 'Atom'],
    },
    {
      _id: '4',
      title: 'Fourth board',
      owner: 'Tom',
      users: ['Luke', 'Atom'],
    },
    {
      _id: '5',
      title: 'Fifth board',
      owner: 'Tom',
      users: ['Luke', 'Atom'],
    },
  ];
}
