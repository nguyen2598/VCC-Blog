import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
    dataUsers: any;
    totalPages: number = 1;
    currentPage: number = 1;
    searchKey: string = '';
    status: string = '';
    queryParams: { [key: string]: any } = {};
    searchForm: FormGroup;
    searchTerm = new Subject<string>(); // khởi tạo một Subject
    idUser: string | undefined;
    isDelete: boolean = true;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.searchForm = this.fb.group({
            key: ['', [Validators.required]],
        });
        this.searchTerm
            .pipe(
                debounceTime(300), // Đợi 300ms sau mỗi lần nhập liệu
                distinctUntilChanged(), // Chỉ tiếp tục nếu giá trị thay đổi
            )
            .subscribe((term) => {
                this.performSearch(term); // Thực hiện tìm kiếm
            });
    }
    ngOnInit(): void {
        // this.fetchData(1);
        this.route.queryParams.subscribe((queryParams) => {
            this.queryParams = queryParams;
            this.currentPage = queryParams['page'] ? parseInt(queryParams['page'], 10) : 1;
            this.searchKey = queryParams['key'] || '';
            this.status = queryParams['status'] || '';
            console.log(`Query Params: `, this.queryParams);

            // Thêm page=1 nếu chưa có
            if (!queryParams['page']) {
                this.router.navigate([], {
                    relativeTo: this.route,
                    queryParams: { ...queryParams, page: '1' }, // Giữ các query params khác và thêm page=1
                    queryParamsHandling: 'merge', // Giữ các query params khác nếu có
                });
            } else {
                // Gọi API với params và queryParams
                this.fetchData();
            }
        });
    }
    fetchData(): void {
        this.userService.getUsers(this.queryParams).subscribe(
            (res) => {
                this.dataUsers = res.data.rows;
                console.log({ dataUsers: this.dataUsers });
                this.totalPages = Math.ceil(res.data.count / 10);
            },
            (error) => {
                console.log({ error });
            },
        );
    }

    get pages(): number[] {
        return Array(this.totalPages)
            .fill(0)
            .map((x, i) => i + 1);
    }

    onPageChange(page: number) {
        this.currentPage = page;
        this.fetchData();
        //xử lý thay đổi trang ở đây
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { ...this.queryParams, page: page.toString() }, // Giữ các query params khác và thêm page=1
            queryParamsHandling: 'merge', // Giữ các query params khác nếu có
        });
    }
    onSearch(): void {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { ...this.queryParams, key: this.searchKey, page: '1' },
            queryParamsHandling: 'merge',
        });
    }
    onStatusChange(status: string): void {
        this.status = status;
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { ...this.queryParams, status: this.status, page: '1' },
            queryParamsHandling: 'merge',
        });
    }
    // onSubmit() {
    //     this.searchKey = this.searchForm.value;
    //     this.onSearch();
    // }
    onSearchChange(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.searchTerm.next(inputElement.value); // Gửi giá trị mới vào Subject
    }

    performSearch(term: string): void {
        console.log(`Searching for: ${term}`);
        this.searchKey = term;
        this.onSearch();
        // Thực hiện các hành động tìm kiếm ở đây
    }
    deleteOrRestoreUser() {
        if (this.idUser) {
            if (this.isDelete) {
                this.userService.deleteUser(this.idUser).subscribe(
                    (res) => {
                        window.location.reload();
                        console.log('user deleted successfully');
                        // Xử lý khi xóa thành công, có thể là refresh lại danh sách hoặc các thao tác khác
                    },
                    (err) => {
                        console.error('Error deleting user:', err);
                        // Xử lý khi xảy ra lỗi trong quá trình xóa
                    },
                );
            } else {
                this.userService.restoreUser(this.idUser).subscribe(
                    (res) => {
                        window.location.reload();
                        console.log('user restored successfully');
                        // Xử lý khi xóa thành công, có thể là refresh lại danh sách hoặc các thao tác khác
                    },
                    (err) => {
                        console.error('Error restoring user:', err);
                        // Xử lý khi xảy ra lỗi trong quá trình xóa
                    },
                );
            }
        } else {
            console.error('No id to delete');
            // Xử lý khi không có id để xóa
        }
    }
    setIdUser(id: string, isDelete: boolean) {
        this.idUser = id;
        this.isDelete = isDelete;
    }
}
