import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminComponent } from './admin.component';
import { MainComponent } from './components/main/main.component';
import { CategoryComponent } from './components/category/category.component';
import { UserComponent } from './components/user/user.component';
import { LanguageComponent } from './components/language/language.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', redirectTo: 'category', pathMatch: 'full' },
            {
                path: 'category',
                loadChildren: () => import('./components/category/category.module').then((m) => m.CategoryModule),
            },
            {
                path: 'user',
                loadChildren: () => import('./components/user/user.module').then((m) => m.UserModule),
            },
            {
                path: 'language',
                loadChildren: () => import('./components/language/language.module').then((m) => m.LanguageModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
