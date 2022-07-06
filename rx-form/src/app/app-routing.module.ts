import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneNumComponent } from './phone-num/phone-num.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

const routes: Routes = [
  {
    path: 'phone',
    component: PhoneNumComponent
  }, {
    path: 'register',
    component: RegistrationFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
