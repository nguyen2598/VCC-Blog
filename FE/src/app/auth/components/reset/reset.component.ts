import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.scss'],
})
export class ResetComponent {
    resetForm: FormGroup;
    constructor(private fb: FormBuilder) {
        this.resetForm = this.fb.group(
            {
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

    onSubmit() {
        if (this.resetForm.valid) {
            console.log('Form Submitted!', this.resetForm.value);
        } else {
            console.log('Form is invalid');
        }
    }
}
