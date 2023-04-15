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
import { CcPrivacyPolicyComponent } from './cc-privacy-policy/cc-privacy-policy.component';
import { CcTermsOfServiceComponent } from './cc-terms-of-service/cc-terms-of-service.component';
import { FooterComponent } from './footer/footer.component';
import { CcContactComponent } from './cc-contact/cc-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    CcOptionsComponent,
    CcPreviewComponent,
    LoadingAnimationComponent,
    CcAboutComponent,
    CcPrivacyPolicyComponent,
    CcTermsOfServiceComponent,
    FooterComponent,
    CcContactComponent,
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
