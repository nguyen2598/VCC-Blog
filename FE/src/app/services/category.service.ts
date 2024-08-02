import { Injectable } from '@angular/core';
import { QueryService } from './query.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(private queryService: QueryService) {}
    getCategories(params?: object | undefined): Observable<any> {
        return this.queryService.get('categories', params);
    }
    getDetailCategory(categoryId: string): Observable<any> {
        return this.queryService.get(`categories/${categoryId}`);
    }
    createCategory({ name }: { name: string }): Observable<string> {
        console.log({ namesss: name });
        return this.queryService.post(`categories/create`, { name });
    }
    updateCategory({ name, categoryId }: { name: string; categoryId: string }): Observable<string> {
        return this.queryService.put(`categories/update/${categoryId}`, { name });
    }
    deleteCategory(categoryId: string): Observable<string> {
        return this.queryService.delete(`categories/delete`, categoryId);
    }
}
