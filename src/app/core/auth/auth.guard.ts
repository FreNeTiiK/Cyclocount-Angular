import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private _authService: AuthService,
                private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this._check(route, state);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this._check(childRoute, state);
    }

    private _check(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this._authService.loggedIn()) {
            return true;
        } else {
            this._router.navigate(['/login'], { queryParams: { 'redirectURL': state.url }});
            return false;
        }
    }
}
