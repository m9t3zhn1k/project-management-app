import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@app/shared/directives/directives.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ColumnComponent } from './components/column/column.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { BoardService } from './services/board.service';

@NgModule({
  declarations: [BoardPageComponent, ColumnComponent, TaskCardComponent, TaskModalComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    DragDropModule,
    OverlayModule,
  ],
  providers: [BoardService],
})
export class ProjectsModule {}
