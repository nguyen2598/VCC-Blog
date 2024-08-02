import { Injectable } from '@angular/core';
import { QueryService } from './query.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    constructor(private queryService: QueryService) {}
    getLanguages(params?: object | undefined): Observable<any> {
        return this.queryService.get('languages', params);
    }
    getDetailLanguage(languageId: string): Observable<any> {
        return this.queryService.get(`languages/${languageId}`);
    }
    createLanguage({ name, locale, flag }: { name: string; locale: string; flag: string }): Observable<string> {
        console.log('haha;', { name, locale, flag });
        return this.queryService.post(`languages/create`, { name, locale, flag });
    }
    updateLanguage({ name, LanguageId }: { name: string; LanguageId: string }): Observable<string> {
        return this.queryService.put(`languages/update/${LanguageId}`, { name });
    }
    deleteLanguage(LanguageId: string): Observable<string> {
        return this.queryService.delete(`languages/delete`, LanguageId);
    }
}
