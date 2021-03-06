import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { AuthService } from 'app/core/auth/auth.service';
import {Observable} from 'rxjs';
import moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        const token = this.auth.getToken();
        if (token) {
            const expTimestamp = JSON.parse(atob(token.split('.')[1])).exp;
            if (moment().unix() >= expTimestamp) {
                this.auth.logout();
            }
            const tokenizedReq = req.clone({
                headers: req.headers.set(
                    'Authorization', 'Bearer ' + token
                )
            });

            return next.handle(tokenizedReq);
        }

        return next.handle(req);
    }
}
