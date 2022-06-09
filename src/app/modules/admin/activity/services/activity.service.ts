import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'environments/environment';
import {Activity} from 'app/modules/admin/activity/types/activity.type';
import {ActivityPush} from 'app/modules/admin/activity/types/activity-push.type';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
    baseApiUrl = `${environment.apiUrl}/activities`;

    constructor(private http: HttpClient) {}

    getActivitiesByUser(userId: number): Observable<Activity[]> {
        return this.http.get<Activity[]>(`${this.baseApiUrl}/${userId}`);
    }

    createActivity(activity: ActivityPush): Observable<ActivityPush> {
        return this.http.post<ActivityPush>(`${this.baseApiUrl}`, activity);
    }

    updateActivity(activityId: number, activity: ActivityPush): Observable<ActivityPush> {
        return this.http.put<ActivityPush>(`${this.baseApiUrl}/${activityId}`, activity);
    }

    deleteActivity(activityId: number): Observable<any> {
        return this.http.delete<any>(`${this.baseApiUrl}/${activityId}`);
    }
}
