import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    // <<<<<<< Updated upstream
    //     {
    //         path: 'admin',
    //         loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    //     },
    // =======
    //     // { path: 'auth', component: AuthComponent },
    //     // { path: '', component: AuthComponent },
    // >>>>>>> Stashed changes
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    },
    // <<<<<<< Updated upstream
    // =======
    // { path: '', component: AuthComponent },
    //   {
    //     path: 'auth',
    //     loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    //   },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    },
    // {
    //     path: '',
    //     loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    // },
    {
        path: '**',
        redirectTo: '/admin/category',
    },
    // >>>>>>> Stashed changes
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
