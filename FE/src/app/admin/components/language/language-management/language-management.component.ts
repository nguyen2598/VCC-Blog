import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';
import { UploadService } from 'src/app/services/upload.service';
import { hostUrl } from 'src/environments/environment';

@Component({
    selector: 'app-language-management',
    templateUrl: './language-management.component.html',
    styleUrls: ['./language-management.component.scss'],
})
export class LanguageManagementComponent {
    languageForm: FormGroup;
    fileToUpload: File | null = null;
    flag: string | null = null;
    constructor(
        private fb: FormBuilder,
        private languageService: LanguageService,
        private uploadService: UploadService,
    ) {
        this.languageForm = this.fb.group({
            name: ['', [Validators.required]],
            locale: ['', [Validators.required]],
            flag: ['', [Validators.required]],
        });
    }
    onSubmit(): void {
        if (this.languageForm.valid && this.flag) {
            const { name, locale } = this.languageForm.value;
            console.log({ name, locale });
            this.languageService.createLanguage({ name, locale, flag: this.flag }!).subscribe(
                (res) => {
                    console.log({ res });
                    // this.message = { status: true, message: 'Category created successfully' };
                    this.languageForm.reset();
                },
                (err) => {
                    if (err.error.status === 422) {
                        // this.message = { status: false, message: 'Category has been used' };
                    }
                },
            );
        } else {
            console.log('Form is invalid', this.languageForm.value);
            this.languageForm.markAllAsTouched();
        }
    }
    onFileChange(event: any) {
        if (event.target.files && event.target.files.length > 0) {
            // this.fileToUpload = event.target.files[0];
            console.log('event.target.files[0]', event.target.files[0]);
            const formData = new FormData();
            formData.append('uploaded_file', event.target.files[0]);
            console.log(formData);
            this.uploadService.upload(formData).subscribe(
                (data) => {
                    console.log({ data });
                    this.flag = hostUrl + data.path;
                },
                (err) => {
                    console.log({ err });
                },
            );
        }
    }
}
