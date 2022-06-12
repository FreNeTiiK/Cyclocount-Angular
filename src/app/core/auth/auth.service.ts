import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { StorageService } from 'app/core/storage/storage.service';
import {environment} from 'environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private _loginUrl = `${environment.apiUrl}` + '/login_check';

    constructor(private http: HttpClient,
              private router: Router,
              private storage: StorageService
    ) { }

    loginUser(user: {username: string; password: string}): Observable<{token: string}> {
        return this.http.post<{token: string}>(this._loginUrl, user);
    }

    loggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    logout(): void {
        this.storage.clearSessionStorage();
        this.router.navigate(['login']);
    }
}
