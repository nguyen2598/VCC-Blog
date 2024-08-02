import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoverComponent } from './components/recover/recover.component';
import { IdentifyComponent } from './components/identify/identify.component';
import { ResetComponent } from './components/reset/reset.component';
// import { LoginModule } from './components/login/login.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AuthComponent,
        RegisterComponent,
        LoginComponent,
        RecoverComponent,
        IdentifyComponent,
        ResetComponent,
    ],
    imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule],
})
export class AuthModule {}
