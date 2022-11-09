import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule, SvgIconRegistryService } from 'angular-svg-icon';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule, CoreModule, HttpClientModule, AngularSvgIconModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private iconReg: SvgIconRegistryService) {
    this.iconReg.loadSvg('../assets/icons/logo.svg', 'logo')?.subscribe();
    this.iconReg.loadSvg('../assets/icons/rs-logo.svg', 'rs-logo')?.subscribe();
  }
}
