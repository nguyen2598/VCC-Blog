import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
    selector: 'app-language-list',
    templateUrl: './language-list.component.html',
    styleUrls: ['./language-list.component.scss'],
})
export class LanguageListComponent {
    data: any;
    idToDelete: string | undefined;
    constructor(private languageService: LanguageService) {}
    // ngOnChanges(changes: SimpleChanges): void {
    //     throw new Error('Method not implemented.');
    // }
    ngOnInit(): void {
        this.languageService.getLanguages().subscribe(
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
                console.log({ a: this.data });
            },
            (error) => {
                console.log({ error });
            },
        );
    }
    deleteLanguage() {
        if (this.idToDelete) {
            this.languageService.deleteLanguage(this.idToDelete).subscribe(
                (res) => {
                    window.location.reload();
                    console.log('Language deleted successfully');
                    // Xử lý khi xóa thành công, có thể là refresh lại danh sách hoặc các thao tác khác
                },
                (err) => {
                    console.error('Error deleting Language:', err);
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
