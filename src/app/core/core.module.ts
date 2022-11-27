import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CoreRoutingModule } from './core-routing.module';
import { AngularSvgIconModule, SvgIconRegistryService } from 'angular-svg-icon';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmationModalModule } from '@shared/confirmation-modal/confirmation-modal.module';
import { ToastModule } from '@shared/toast/toast.module';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { DarkModeComponent } from './components/header/dark-mode/dark-mode.component';
import { MenuComponent } from './components/header/menu/menu.component';
import { ClickOutSIdeDirective } from '@app/shared/directives/clickOutSide/click-out-side.directive';

import { reducers } from './store/reducers/app.reducer';
import { AuthEffects } from './store/effects/auth.effects';
import { AuthService } from '@auth/services/auth.service';

import { interceptors } from './interceptors/interceptors';

import { AuthGuard } from './guards/auth.guard';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
@NgModule({
  imports: [
    CoreRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects]),
    AngularSvgIconModule,
    AngularSvgIconModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ConfirmationModalModule,
    ToastModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    WelcomePageComponent,
    NotFoundPageComponent,
    DarkModeComponent,
    MenuComponent,
    ClickOutSIdeDirective,
  ],
  exports: [HeaderComponent, FooterComponent, ConfirmationModalModule, ToastModule],
  providers: [AuthService, interceptors, AuthGuard],
})
export class CoreModule {
  constructor(private iconReg: SvgIconRegistryService) {
    this.iconReg.loadSvg('../assets/icons/logo.svg', 'logo')?.subscribe();
    this.iconReg.loadSvg('../assets/icons/rs-logo.svg', 'rs-logo')?.subscribe();
  }
}
