import { Injectable } from '@angular/core';
import { QueryService } from './query.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UploadService {
    constructor(private queryService: QueryService) {}
    upload(data: FormData): Observable<any> {
        console.log('data in UploadService');
        return this.queryService.post('files', data);
    }
}
