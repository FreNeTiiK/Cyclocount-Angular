import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, switchMap, take, tap, throwError, map} from 'rxjs';
import {environment} from 'environments/environment';
import {Activity} from 'app/modules/admin/activity/types/activity.type';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
    baseApiUrl = `${environment.apiUrl}/activities`;

    constructor(private http: HttpClient) {}

    getActivitiesByUser(userId: number): Observable<Activity[]> {
        return this.http.get<Activity[]>(`${this.baseApiUrl}/${userId}`);
    }

    deleteActivity(activityId: number): Observable<any> {
        return this.http.delete<any>(`${this.baseApiUrl}/${activityId}`);
    }
}
