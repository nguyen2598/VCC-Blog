import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', component: UserListComponent },
            { path: 'create-user', component: UserManagementComponent },
            { path: 'edit-user', component: UserManagementComponent },
            { path: '**', component: UserListComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule],
    exports: [RouterModule],
})
export class UserRoutingModule {}
