import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private toastr: ToastrService,
        private router: Router,
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    ngOnInit(): void {}

    onSubmit() {
        if (this.loginForm.valid) {
            console.log('Form Submitted!', this.loginForm.value);
            const isRememberMe = (document.querySelector('#rememberMeCheckbox') as HTMLInputElement)?.checked;
            const { email, password } = this.loginForm.value;
            this.authService.login(email!, password!).subscribe(
                (res) => {
                    console.log(res);
                    localStorage.setItem('access_token', res.data.access_token);
                    localStorage.setItem('isLoggedIn', 'true');

                    this.toastr.success('Đăng nhập thành công!', 'Success');
                    this.router.navigate(['admin/category']);
                },
                (error) => {
                    console.log({ error });
                    this.toastr.error('Login failed!', 'Error');
                },
            );
        } else {
            this.toastr.warning('Please fill in all required fields', 'Warning');
            console.log('Form is invalid');
            this.loginForm.markAllAsTouched();
        }
    }
}
