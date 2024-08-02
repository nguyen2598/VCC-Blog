import { Injectable } from '@angular/core';
import { QueryService } from './query.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private queryService: QueryService) {}
    getUsers(params?: object | undefined): Observable<any> {
        return this.queryService.get('users', params);
    }
    getDetailUser(userId: string): Observable<any> {
        return this.queryService.get(`users/${userId}`);
    }
    createUser({
        username,
        password,
        email,
        role,
    }: {
        username: string;
        password: string;
        email: string;
        role: string;
    }): Observable<string> {
        return this.queryService.post(`users/create`, {
            username,
            password,
            email,
        });
    }
    updateUser({ name, UserId }: { name: string; UserId: string }): Observable<string> {
        return this.queryService.put(`users/update/${UserId}`, { name });
    }
    deleteUser(UserId: string): Observable<string> {
        return this.queryService.delete(`users/delete`, UserId);
    }
    restoreUser(UserId: string): Observable<string> {
        return this.queryService.delete(`users/restore`, UserId);
    }
}
