import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthComponent } from './auth.component';
import { RecoverComponent } from './components/recover/recover.component';
import { IdentifyComponent } from './components/identify/identify.component';
import { ResetComponent } from './components/reset/reset.component';

const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'recover', component: RecoverComponent },
      { path: 'identify', component: IdentifyComponent },
      { path: 'reset-password', component: ResetComponent },
      { path: '', component: LoginComponent },
    ],
  },
];

@NgModule({
  // declarations: [LoginComponent, RegisterComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
