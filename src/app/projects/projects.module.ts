import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ColumnComponent } from './components/column/column.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { TaskCardComponent } from './components/task-card/task-card.component';

@NgModule({
  declarations: [BoardPageComponent, ColumnComponent, TaskCardComponent],
  imports: [CommonModule, ProjectsRoutingModule, FormsModule, ReactiveFormsModule],
})
export class ProjectsModule {}
