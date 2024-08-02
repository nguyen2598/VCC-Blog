import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent {
    data: any;
    userForm: FormGroup;
    role: string = '2';
    // constructor(private router: Router) {
    //     const navigation = this.router.getCurrentNavigation();
    //     if (navigation?.extras?.state) {
    //         this.data = navigation.extras.state['data'];
    //         console.log(this.data);
    //     }
    // }
    currentRoute: string = '';

    message: { status: boolean; message: string } | undefined;

    constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute) {
        this.userForm = this.fb.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.route.url.subscribe((urlSegment) => {
            console.log({ urlSegment });
            this.currentRoute = urlSegment[0].path; // Lấy tên của tuyến đường hiện tại
        });
        if (this.currentRoute === 'edit-user') {
            const userId = this.route.snapshot.queryParamMap.get('id'); // Lấy userId từ URL
            console.log({ userId: this.route.snapshot.queryParamMap }, 'dfg');
            if (userId) {
                this.userService.getDetailUser(userId).subscribe(
                    (res) => {
                        this.data = res.data.name; // Lưu dữ liệu chi tiết danh mục vào this.data
                        console.log('User detail:', this.data);
                        // Điền dữ liệu vào form để chỉnh sửa
                        this.userForm.patchValue({
                            name: this.data, // Ví dụ: nếu dữ liệu từ server có trường name
                            // Các trường khác tương tự
                        });
                    },
                    (err) => {
                        console.log({ err });
                        this.data = 'undefined';
                        console.error('Error loading user detail:', err);
                    },
                );
            }
        }
    }

    onSubmit() {
        if (this.userForm.valid) {
            console.log('Form Submitted!', this.userForm.value);
            const { username, email, password, role } = this.userForm.value;
            console.log({ username, email, password, role });
            if (this.currentRoute === 'create-user') {
                console.log('cre');
                this.userService.createUser({ username, email, password, role }!).subscribe(
                    (res) => {
                        console.log({ res });
                        this.message = { status: true, message: 'Category created successfully' };
                        this.userForm.reset();
                    },
                    (err) => {
                        // if (err.error.status === 422) {
                        this.message = { status: false, message: 'Category has been used' };
                        // err.error.data?.errors?.reduce(
                        //     (accumulator: string, current: { field: string; message: string }) => {
                        //         return accumulator + current.message + '\n' + 'ha';
                        //     },
                        //     '',
                        // );
                        // }
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
                // console.log('up');
                // const categoryId = this.route.snapshot.queryParamMap.get('id');
                // console.log('aaa', { categoryId });
                // if (categoryId) {
                //     this.userService.updateUser({ name, categoryId }!).subscribe(
                //         (res) => {
                //             console.log({ res });
                //             this.message = { status: true, message: 'Category updated successfully' };
                //         },
                //         (err) => {
                //             console.log({ err });
                //             if (err.error.status === 404) {
                //                 this.message = { status: false, message: 'Category not found' };
                //                 // err.error.data?.errors?.reduce(
                //                 //     (accumulator: string, current: { field: string; message: string }) => {
                //                 //         return accumulator + current.message + '\n' + 'ha';
                //                 //     },
                //                 //     '',
                //                 // );
                //             } else if (err.error.status === 500) {
                //                 this.message = {
                //                     status: false,
                //                     message: err.error?.message as string | 'Server notFound',
                //                 };
                //                 // err.error.data?.errors?.reduce(
                //                 //     (accumulator: string, current: { field: string; message: string }) => {
                //                 //         return accumulator + current.message + '\n' + 'ha';
                //                 //     },
                //                 //     '',
                //                 // );
                //             }
                //             // console.log({
                //             //     err: err.error.data?.errors?.reduce(
                //             //         (accumulator: string, current: { field: string; message: string }) => {
                //             //             return accumulator + current.message + '\n' + 'ha';
                //             //         },
                //             //         '',
                //             //     ),
                //             // });
                //         },
                //     );
                // }
            }
        } else {
            console.log('Form is invalid');
            this.userForm.markAllAsTouched();
        }
    }
}
