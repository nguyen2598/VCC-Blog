import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryManagementComponent } from './components/category/category-management/category-management.component';
import { CategoryComponent } from './components/category/category.component';
import { HeaderComponent } from './components/header/header.component';
import { LanguageListComponent } from './components/language/language-list/language-list.component';
import { LanguageManagementComponent } from './components/language/language-management/language-management.component';
import { LanguageComponent } from './components/language/language.component';
import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        AdminComponent,
        MainComponent,
        // CategoryComponent,
        // LanguageComponent,
        // LanguageManagementComponent,
        // CategoryListComponent,
        // CategoryManagementComponent,
        // LanguageListComponent,
    ],
    imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
