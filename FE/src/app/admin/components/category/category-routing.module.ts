import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryManagementComponent } from './category-management/category-management.component';

const routes: Routes = [
    {
        path: '',
        component: CategoryComponent,
        children: [
            { path: '', component: CategoryListComponent },
            { path: 'create-category', component: CategoryManagementComponent },
            { path: 'edit-category', component: CategoryManagementComponent },
            { path: '**', component: CategoryListComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CategoryRoutingModule {}
