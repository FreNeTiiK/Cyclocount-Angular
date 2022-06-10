import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'environments/environment';
import {TypeObjective} from 'app/modules/admin/annual-objective/types/type-objective.type';
import {AnnualObjective} from 'app/modules/admin/annual-objective/types/annual-objective.type';

@Injectable({
    providedIn: 'root'
})
export class AnnualObjectiveService {
    baseApiUrl = `${environment.apiUrl}/annualObjectives`;
    baseApiUrlTypeObjective = `${environment.apiUrl}/typeObjectives`;

    constructor(private http: HttpClient) {}

    getAnnualObjectiveByUser(userId: number): Observable<AnnualObjective[]> {
        return this.http.get<AnnualObjective[]>(`${this.baseApiUrl}/${userId}`);
    }

    createAnnualObjective(annualObjective: any): Observable<any> {
        return this.http.post<any>(`${this.baseApiUrl}`, annualObjective);
    }

    updateAnnualObjective(annualObjectiveId: number, annualObjective: any): Observable<any> {
        return this.http.put<any>(`${this.baseApiUrl}/${annualObjectiveId}`, annualObjective);
    }

    deleteAnnualObjective(annualObjectiveId: number): Observable<any> {
        return this.http.delete<any>(`${this.baseApiUrl}/${annualObjectiveId}`);
    }

    getTypeObjectives(): Observable<TypeObjective[]> {
        return this.http.get<TypeObjective[]>(this.baseApiUrlTypeObjective);
    }
}
