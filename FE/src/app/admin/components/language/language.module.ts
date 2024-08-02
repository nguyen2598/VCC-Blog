import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguageRoutingModule } from './language-routing.module';
import { LanguageComponent } from './language.component';
import { LanguageListComponent } from './language-list/language-list.component';
import { LanguageManagementComponent } from './language-management/language-management.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [LanguageComponent, LanguageListComponent, LanguageManagementComponent],
    imports: [CommonModule, LanguageRoutingModule, ReactiveFormsModule],
})
export class LanguageModule {}
