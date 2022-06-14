import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'environments/environment';
import {Equipment} from 'app/modules/admin/equipment/types/equipment.type';

@Injectable({
    providedIn: 'root'
})
export class StatisticService {
    baseApiUrl = `${environment.apiUrl}/activities`;

    constructor(private http: HttpClient) {}

    getKmChart(): Observable<any> {
        return this.http.get<any>(`${this.baseApiUrl}/kmChart`);
    }
}
