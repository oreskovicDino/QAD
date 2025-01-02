import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    
    return from(authService.getCurrentUserToken()).pipe(
        switchMap((token) => {
            if (token) {
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
            return next(req);
        })
    );
};
