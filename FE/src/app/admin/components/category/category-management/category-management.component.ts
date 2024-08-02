import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'app-category-management',
    templateUrl: './category-management.component.html',
    styleUrls: ['./category-management.component.scss'],
})
export class CategoryManagementComponent {
    data: any;
    categoryForm: FormGroup;
    // constructor(private router: Router) {
    //     const navigation = this.router.getCurrentNavigation();
    //     if (navigation?.extras?.state) {
    //         this.data = navigation.extras.state['data'];
    //         console.log(this.data);
    //     }
    // }
    currentRoute: string = '';

    message: { status: boolean; message: string } | undefined;

    constructor(private fb: FormBuilder, private categoryService: CategoryService, private route: ActivatedRoute) {
        this.categoryForm = this.fb.group({
            name: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.route.url.subscribe((urlSegment) => {
            console.log({ urlSegment });
            this.currentRoute = urlSegment[0].path; // Lấy tên của tuyến đường hiện tại
        });
        if (this.currentRoute === 'edit-category') {
            const categoryId = this.route.snapshot.queryParamMap.get('id'); // Lấy categoryId từ URL
            console.log({ categoryId: this.route.snapshot.queryParamMap }, 'dfg');
            if (categoryId) {
                this.categoryService.getDetailCategory(categoryId).subscribe(
                    (res) => {
                        this.data = res.data.name; // Lưu dữ liệu chi tiết danh mục vào this.data
                        console.log('Category detail:', this.data);
                        // Điền dữ liệu vào form để chỉnh sửa
                        this.categoryForm.patchValue({
                            name: this.data, // Ví dụ: nếu dữ liệu từ server có trường name
                            // Các trường khác tương tự
                        });
                    },
                    (err) => {
                        console.log({ err });
                        this.data = 'undefined';
                        console.error('Error loading category detail:', err);
                    },
                );
            }
        }
    }

    onSubmit() {
        if (this.categoryForm.valid) {
            console.log('Form Submitted!', this.categoryForm.value);
            const { name } = this.categoryForm.value;
            console.log({ name });
            if (this.currentRoute === 'create-category') {
                console.log('cre');
                this.categoryService.createCategory({ name }!).subscribe(
                    (res) => {
                        console.log({ res });
                        this.message = { status: true, message: 'Category created successfully' };
                        this.categoryForm.reset();
                    },
                    (err) => {
                        if (err.error.status === 422) {
                            this.message = { status: false, message: 'Category has been used' };
                            // err.error.data?.errors?.reduce(
                            //     (accumulator: string, current: { field: string; message: string }) => {
                            //         return accumulator + current.message + '\n' + 'ha';
                            //     },
                            //     '',
                            // );
                        }
                        // console.log({
                        //     err: err.error.data?.errors?.reduce(
                        //         (accumulator: string, current: { field: string; message: string }) => {
                        //             return accumulator + current.message + '\n' + 'ha';
                        //         },
                        //         '',
                        //     ),
                        // });
                    },
                );
            } else {
                console.log('up');
                const categoryId = this.route.snapshot.queryParamMap.get('id');
                console.log('aaa', { categoryId });
                if (categoryId) {
                    this.categoryService.updateCategory({ name, categoryId }!).subscribe(
                        (res) => {
                            console.log({ res });
                            this.message = { status: true, message: 'Category updated successfully' };
                        },
                        (err) => {
                            console.log({ err });
                            if (err.error.status === 404) {
                                this.message = { status: false, message: 'Category not found' };
                                // err.error.data?.errors?.reduce(
                                //     (accumulator: string, current: { field: string; message: string }) => {
                                //         return accumulator + current.message + '\n' + 'ha';
                                //     },
                                //     '',
                                // );
                            } else if (err.error.status === 500) {
                                this.message = {
                                    status: false,
                                    message: err.error?.message as string | 'Server notFound',
                                };
                                // err.error.data?.errors?.reduce(
                                //     (accumulator: string, current: { field: string; message: string }) => {
                                //         return accumulator + current.message + '\n' + 'ha';
                                //     },
                                //     '',
                                // );
                            }
                            // console.log({
                            //     err: err.error.data?.errors?.reduce(
                            //         (accumulator: string, current: { field: string; message: string }) => {
                            //             return accumulator + current.message + '\n' + 'ha';
                            //         },
                            //         '',
                            //     ),
                            // });
                        },
                    );
                }
            }
        } else {
            console.log('Form is invalid');
            this.categoryForm.markAllAsTouched();
        }
    }
}
