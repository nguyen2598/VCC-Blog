import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'FE';
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.checkToken().subscribe(
            (res) => {
                localStorage.setItem('isLoggedIn', 'true');
                console.log(res);
                // this.router.navigate(['admin/category']);
            },
            (error) => {
                localStorage.setItem('isLoggedIn', 'false');

                console.log({ error });
            },
        );
    }

    onSubmit() {}
}
