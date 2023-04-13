import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { CcOptionsComponent } from './cc-options/cc-options.component';
import { CcPreviewComponent } from './cc-preview/cc-preview.component';
import { LoadingAnimationComponent } from './animation/loading/loading-animation/loading-animation.component';
import { ConfigService } from './services/config/config.service';
import { CcAboutComponent } from './cc-about/cc-about.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    CcOptionsComponent,
    CcPreviewComponent,
    LoadingAnimationComponent,
    CcAboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () => { return configService.loadConfig(); },
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
