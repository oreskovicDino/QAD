import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/UserDTO';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    /** Fetches user permissions */
    public getUser = (): Observable<UserDTO> => {
        return this.http.get<UserDTO>(`/users`);
    };
}