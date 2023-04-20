import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CcPrivacyPolicyComponent } from './cc-privacy-policy/cc-privacy-policy.component';
import { CcTermsOfServiceComponent } from './cc-terms-of-service/cc-terms-of-service.component';
import { CcContactComponent } from './cc-contact/cc-contact.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'home',
    redirectTo: ''
  },
  {
    path: 'contact',
    component: CcContactComponent
  },
  {
    path: 'privacy',
    component: CcPrivacyPolicyComponent
  },
  {
    path: 'terms',
    component: CcTermsOfServiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
