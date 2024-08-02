import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { hostUrl } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class QueryService {
    private _options = {};
    constructor(private httpClient: HttpClient) {
        this._options = {
            headers: new HttpHeaders({
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            }),
        };
    }
    get(query: string, params?: { [key: string]: any }): Observable<any> {
        return this.httpClient.get(
            `${hostUrl}${query}` + (params ? '?' + _paramSerializer(params) : ''),
            this._options,
        );
    }
    post(query: string, body: any): Observable<any> {
        console.log({ body });
        return this.httpClient.post(`${hostUrl}${query}`, body, this._options);
    }
    put(query: string, data: any): Observable<any> {
        return this.httpClient.put(`${hostUrl}${query}`, data, this._options);
    }
    delete(query: string, params: string): Observable<any> {
        return this.httpClient.delete(`${hostUrl}${query}/${params}`, this._options);
    }
}
function _paramSerializer(paramObject?: { [key: string]: any }) {
    if (!paramObject) {
        return '';
    }
    const keys = Object.keys(paramObject);
    if (keys.length === 0) {
        return '';
    }
    return keys
        .map((key) => {
            return `${key}=${paramObject[key]}`;
        })
        .join('&');
}
