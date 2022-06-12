import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'app/core/user/types/user.type';
import {environment} from 'environments/environment';
import {UserUpdate} from 'app/core/user/types/user-update.type';

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    baseApiUrl = `${environment.apiUrl}/users`;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {}

    getUserByUsername(username: string): Observable<User> {
        return this._httpClient.get<User>(`${this.baseApiUrl}/${username}`);
    }

    checkIfUsernameExists(username: string): Observable<boolean> {
        return this._httpClient.get<boolean>(`${this.baseApiUrl}/checkUsername/${username}`);
    }

    updateUser(userId: number, user: UserUpdate): Observable<UserUpdate> {
        return this._httpClient.put<UserUpdate>(`${this.baseApiUrl}/${userId}`, user);
    }

    changePasswordUser(userId: number, passwords: any): Observable<UserUpdate> {
        return this._httpClient.put<UserUpdate>(`${this.baseApiUrl}/changePassword/${userId}`, passwords);
    }
}
