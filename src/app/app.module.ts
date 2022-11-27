import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerModule } from '@app/shared/spinner/spinner.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule, SpinnerModule, CoreModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
