import { IBoard } from '@app/shared/models/IBoard';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectsFilter',
})
export class ProjectsFilterPipe implements PipeTransform {
  transform(projects: IBoard[] | null, filter: string): IBoard[] | null {
    if (!filter || !projects) {
      return projects;
    }
    return projects.filter((project: IBoard): boolean => {
      return (
        project.owner.toLowerCase().includes(filter) ||
        project.title.toLowerCase().includes(filter) ||
        !!project.users.map((user) => user.toLowerCase()).filter((user) => user.includes(filter)).length
      );
    });
  }
}
