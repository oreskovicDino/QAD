import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
    const modifiedReq = req.clone({
        url: `http://localhost:3000/api${req.url}`
    });
    return next(modifiedReq);
};