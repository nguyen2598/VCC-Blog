import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageComponent } from './language.component';
import { LanguageListComponent } from './language-list/language-list.component';
import { LanguageManagementComponent } from './language-management/language-management.component';

const routes: Routes = [
    {
        path: '',
        component: LanguageComponent,
        children: [
            {
                path: '',
                component: LanguageListComponent,
            },
            {
                path: 'create-language',
                component: LanguageManagementComponent,
            },
            {
                path: 'update-language',
                component: LanguageManagementComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LanguageRoutingModule {}
