import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    registerForm: FormGroup;
    constructor(private fb: FormBuilder, private authService: AuthService) {
        this.registerForm = this.fb.group(
            {
                username: ['', [Validators.required]],
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', Validators.required],
            },
            {
                validator: this.passwordMatchValidator, // Đã thêm validator để so sánh password và confirmPassword
            },
        );
    }

    passwordMatchValidator(g: FormGroup) {
        console.log({ a: g.get('confirmPassword')?.value, b: g.get('password')?.value });
        return g.get('password')?.value === g.get('confirmPassword')?.value ? null : { mismatch: true };
    }
    ngOnInit(): void {}
    onSubmit() {
        if (this.registerForm.valid) {
            console.log('Form Submitted!', this.registerForm.value);
            const { email, username, password } = this.registerForm.value;
            this.authService.signup(username!, email!, password!).subscribe((res) => {
                console.log(res);
            });
        } else {
            console.log('Form is invalid');
            this.registerForm.markAllAsTouched();
        }
    }
}
