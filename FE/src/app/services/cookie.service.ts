import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CookieService {
    constructor() {}

    // Lưu giá trị vào cookie
    setCookie(name: string, value: string, days: number) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    // Lấy giá trị từ cookie
    getCookie(name: string): string | null | undefined {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : null;
    }

    // Xóa cookie
    deleteCookie(name: string) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
}
