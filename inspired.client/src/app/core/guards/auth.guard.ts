import { inject, Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Auth } from '@angular/fire/auth';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> {
        return this.authService.getCurrentUserToken().pipe(
            map(token => {
                if (token) {
                    return true;
                } else {
                    // Redirect to login page if not authenticated
                    return this.router.createUrlTree(['/auth/login']);
                }
            })
        );
    }
}