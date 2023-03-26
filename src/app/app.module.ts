import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { CcOptionsComponent } from './landing/components/cc-options/cc-options.component';
import { CcPreviewComponent } from './landing/components/cc-preview/cc-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    CcOptionsComponent,
    CcPreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
