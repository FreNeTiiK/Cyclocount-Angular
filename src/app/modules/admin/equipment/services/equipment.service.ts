import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'environments/environment';
import {Equipment} from 'app/modules/admin/equipment/types/equipment.type';

@Injectable({
    providedIn: 'root'
})
export class EquipmentService {
    baseApiUrl = `${environment.apiUrl}/equipments`;

    constructor(private http: HttpClient) {}

    getEquipmentsByUser(userId: number): Observable<Equipment[]> {
        return this.http.get<Equipment[]>(`${this.baseApiUrl}/${userId}`);
    }
}
