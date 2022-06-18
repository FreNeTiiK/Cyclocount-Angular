import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'environments/environment';
import {AnnualObjectiveStats} from 'app/modules/admin/statistic/types/annual-objective-stats.type';

@Injectable({
    providedIn: 'root'
})
export class StatisticService {
    baseApiUrl = `${environment.apiUrl}/statistics`;

    constructor(private http: HttpClient) {}

    getCharts(activityTypeId: number): Observable<any> {
        return this.http.get<any>(`${this.baseApiUrl}/charts/${activityTypeId}`);
    }

    getAnnualObjectivesChart(activityTypeId: number): Observable<AnnualObjectiveStats> {
        return this.http.get<AnnualObjectiveStats>(`${this.baseApiUrl}/annualObjectives/${activityTypeId}`);
    }
}
