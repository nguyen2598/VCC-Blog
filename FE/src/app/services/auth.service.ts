import { Injectable } from '@angular/core';
import { QueryService } from './query.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private queryService: QueryService) {}
    login(email: string, password: string): Observable<any> {
        return this.queryService.post('auth/login', { email, password });
    }
    checkToken(): Observable<any> {
        return this.queryService.get('auth/checkToken');
    }
    signup(username: string, password: string, email: string): Observable<string> {
        return this.queryService.post('auth/register', { username, password, email });
    }
    identify(email: string): Observable<string> {
        return this.queryService.post('auth/recover-password', { email });
    }
    sendCode(code: string): Observable<string> {
        return this.queryService.post('auth/identify', { code });
    }
    resetPassword(password: string): Observable<string> {
        return this.queryService.post('auth/reset-password', { password });
    }
}
