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

    getEquipmentsByUser(userId: number, activityTypeId?: number): Observable<Equipment[]> {
        let url = `${this.baseApiUrl}/${userId}`;

        if(activityTypeId) {
            url += `/${activityTypeId}`;
        }

        return this.http.get<Equipment[]>(url);
    }

    createEquipment(equipment: any): Observable<any> {
        return this.http.post<any>(`${this.baseApiUrl}`, equipment);
    }

    updateEquipment(equipmentId: number, equipment: any): Observable<any> {
        return this.http.put<any>(`${this.baseApiUrl}/${equipmentId}`, equipment);
    }

    deleteEquipment(equipmentId: number): Observable<any> {
        return this.http.delete<any>(`${this.baseApiUrl}/${equipmentId}`);
    }
}
