import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

const header = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private roter: Router
    ) { }

    private auth = environment.api + "login";

    login(username: string) {
        return this.http.post(this.auth + `/${username}`, {}, header);
    }

    loggedIn(): boolean {
        return !!localStorage.getItem('key');
    }

    getToken() {
        return localStorage.getItem('token_access');
    }

    getKey() {
        return localStorage.getItem('key');
    }

    logout() {
        localStorage.removeItem("key");
        localStorage.removeItem("user");
        this.roter.navigate(['/login']);
    }
}
