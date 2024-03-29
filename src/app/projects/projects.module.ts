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
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { UserLabelComponent } from './components/user-label/user-label.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { ProjectsFilterPipe } from './pipes/projects-filter.pipe';
import { ColumnService } from './services/column.service';
import { TaskService } from './services/task.service';
import { UserService } from './services/user.service';
import { InitialPipe } from './pipes/initial.pipe';
import { UserNamePipe } from './pipes/username.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { BoardModalComponent } from '@app/core/components/board-modal/board-modal.component';
import { BoardSearchDirective } from './directives/board-search.directive';
import { SpinnerModule } from '@app/shared/spinner/spinner.module';

@NgModule({
  declarations: [
    BoardPageComponent,
    ProjectsPageComponent,
    ColumnComponent,
    TaskCardComponent,
    TaskModalComponent,
    UserLabelComponent,
    ProjectItemComponent,
    SearchItemComponent,
    InitialPipe,
    UserNamePipe,
    BoardModalComponent,
    ProjectsFilterPipe,
    BoardSearchDirective,
  ],
  imports: [
    TranslateModule,
    CommonModule,
    ProjectsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    DragDropModule,
    OverlayModule,
    AngularSvgIconModule,
    SpinnerModule,
  ],
  providers: [ColumnService, TaskService, UserService],
})
export class ProjectsModule {}
