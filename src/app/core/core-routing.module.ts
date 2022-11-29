import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'projects',
  },
  {
    path: 'welcome',
    component: WelcomePageComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('@auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'projects',
    loadChildren: () => import('@projects/projects.module').then((m) => m.ProjectsModule),
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
