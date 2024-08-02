import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-recover',
    templateUrl: './recover.component.html',
    styleUrls: ['./recover.component.scss'],
})
export class RecoverComponent {
    recoverForm: FormGroup;
    data: any;
    constructor(private fb: FormBuilder, private router: Router) {
        this.recoverForm = this.fb.group({
            code: ['', [Validators.required]],
        });

        // const navigation = this.router.getCurrentNavigation();
        // if (navigation?.extras?.state) {
        //     this.data = navigation.extras.state['data'];
        // }
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras?.state) {
            this.data = navigation.extras.state['data'];
            console.log(this.data);
        } else {
            console.log('No data found, redirecting to home...');
            this.router.navigate(['/auth/identify']); // Chuyển hướng về trang home
        }
    }

    ngOnInit(): void {}
    onSubmit() {
        if (this.recoverForm.valid) {
            console.log('Form Submitted!', this.recoverForm.value);
        } else {
            console.log('Form is invalid');
        }
    }
    convertEmail(email: string): string {
        const atIndex = email.indexOf('@');
        if (atIndex === -1) {
            throw new Error('Invalid email format');
        }

        const emailName = email.substring(0, atIndex);
        const emailDomain = email.substring(atIndex);

        if (emailName.length < 3) {
            return email; // Không chuyển đổi nếu tên email quá ngắn
        }

        const firstChar = emailName.charAt(0);
        const lastChar = emailName.charAt(emailName.length - 1);
        const maskedPart = '***';

        return `${firstChar}${maskedPart}${lastChar}${emailDomain}`;
    }
}
