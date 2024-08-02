import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnChanges, OnInit {
    data: any;
    idToDelete: string | undefined;
    constructor(private categoryService: CategoryService) {}
    ngOnChanges(changes: SimpleChanges): void {
        throw new Error('Method not implemented.');
    }
    ngOnInit(): void {
        this.categoryService.getCategories().subscribe(
            //   (res) => {
            //     let result: ModelExample[] = [];
            //     res?.data.forEach((element: any) => {
            //         const mapped = new ModelExample(element);
            //         result.push(mapped);
            //     });
            //     this.data = res.data;
            //     result.push(new model());
            //     this.data = { id: '1', name: 're' };
            // },
            // ///////////////////////
            (res) => {
                this.data = res.data;
            },
            (error) => {
                console.log({ error });
            },
        );
    }
    deleteCategory() {
        if (this.idToDelete) {
            this.categoryService.deleteCategory(this.idToDelete).subscribe(
                (res) => {
                    window.location.reload();
                    console.log('Category deleted successfully');
                    // Xử lý khi xóa thành công, có thể là refresh lại danh sách hoặc các thao tác khác
                },
                (err) => {
                    console.error('Error deleting category:', err);
                    // Xử lý khi xảy ra lỗi trong quá trình xóa
                },
            );
        } else {
            console.error('No id to delete');
            // Xử lý khi không có id để xóa
        }
    }
    setIdToDelete(id: string) {
        this.idToDelete = id;
    }
}
