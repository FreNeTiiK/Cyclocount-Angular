import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'environments/environment';
import {HomeDataWidgets} from 'app/modules/admin/home/types/home-data-widgets.type';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    baseApiUrl = `${environment.apiUrl}/home`;

    constructor(private http: HttpClient) {}

    getHomeDataWidgets(): Observable<HomeDataWidgets> {
        return this.http.get<HomeDataWidgets>(`${this.baseApiUrl}/data`);
    }

    getHomeDataCharts(): Observable<any> {
        return this.http.get<any>(`${this.baseApiUrl}/charts`);
    }
}
