import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-identify',
    templateUrl: './identify.component.html',
    styleUrls: ['./identify.component.scss'],
})
export class IdentifyComponent {
    identifyForm: FormGroup;
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.identifyForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    onSubmit() {
        if (this.identifyForm.valid) {
            console.log('Form Submitted!', this.identifyForm.value);
            const { email } = this.identifyForm.value;
            this.authService.identify(email!).subscribe({
                next: (res: any) => {
                    console.log('Login successful, token:', res);
                    // Lưu token vào localStorage hoặc xử lý logic khác
                    // localStorage.setItem('authToken', token);
                    const navigationExtras: NavigationExtras = {
                        state: {
                            data: res.data,
                        },
                    };
                    this.router.navigate(['auth/recover'], navigationExtras);
                },
                error: (err) => {
                    console.log('Login error:', err);
                    // this.errorMessage = 'Login failed. Please try again.';
                },
                complete: () => {
                    console.log('Login request completed');
                },
            });
        } else {
            console.log('Form is invalid');
            this.identifyForm.markAllAsTouched();
        }
    }
}
