import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [UserComponent, UserListComponent, UserManagementComponent],
    imports: [CommonModule, UserRoutingModule, FormsModule],
})
export class UserModule {}
