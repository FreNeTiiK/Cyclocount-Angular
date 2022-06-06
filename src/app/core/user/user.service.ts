import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'app/core/user/user.types';
import {environment} from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {}

    getUserByUsername(username: string): Observable<User> {
        return this._httpClient.get<User>(`${environment.apiUrl}/users/${username}`);
    }
}
