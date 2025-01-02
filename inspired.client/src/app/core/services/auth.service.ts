import { Injectable } from '@angular/core';
import {
    Auth,
    signOut,
    signInWithEmailAndPassword,
    browserLocalPersistence,
    onAuthStateChanged,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    sendEmailVerification,
    ActionCodeSettings,
    signInWithCustomToken,
    sendPasswordResetEmail
} from '@angular/fire/auth';
import { deleteUser, setPersistence, User, UserCredential } from 'firebase/auth';
import { catchError, from, lastValueFrom, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserRegisterBM } from '../models/UserRegisterBM';
import { ProviderType } from '../enums/ProviderType';
import { NotVerifiedError } from '../utils/NotVerifiedError';
import { UserCreatedResponseDTO } from '../models/UserCreatedResponseDTO';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private auth: Auth, private http: HttpClient) { }

    public async login(email: string, password: string): Promise<UserCredential | null> {
        try {
            await setPersistence(this.auth, browserLocalPersistence)
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            if (!userCredential.user.emailVerified) return userCredential;
            return null;
        } catch (error) {
            throw error;
        }
    }

    public async loginWithProvider(providerType: ProviderType): Promise<any> {
        let provider: any = null;
        switch (providerType) {
            case ProviderType.Google:
                provider = new GoogleAuthProvider();
                break;
            case ProviderType.Facebook:
                provider = new FacebookAuthProvider();
                break;
            case ProviderType.Apple:
                throw new Error('Apple provider not implemented');
                break;
            default:
                provider = new GoogleAuthProvider();
                break;
        }

        try {
            await setPersistence(this.auth, browserLocalPersistence)
            // Use Firebase Auth to show the popup
            const result = await signInWithPopup(this.auth, provider);
            const userBM = new UserRegisterBM();
            userBM.email = result.user.email ?? '';
            userBM.username = result.user.displayName ?? '';
            // Send the ID token to the backend to check if the user exists
            return await lastValueFrom(this.http.post(`/user/create/provider/login`, userBM));
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }

    }

    public register(userRegister: UserRegisterBM): Observable<any> {
        return this.http.post<UserCreatedResponseDTO>(`/user/create/email`, userRegister).pipe(
            switchMap((userComposite: UserCreatedResponseDTO) => {
                return from(signInWithCustomToken(this.auth, userComposite.customToken)).pipe(
                    switchMap((userCredential) => {
                        return from(sendEmailVerification(userCredential.user));
                    })
                );
            }),
            catchError((error) => {
                console.error('Error during registration or email verification:', error);
                return throwError(() => error);
            })
        );
    }

    public providerRegister(providerType: ProviderType): Observable<any> {
        let provider: any = null;
        switch (providerType) {
            case ProviderType.Google:
                provider = new GoogleAuthProvider();
                break;
            case ProviderType.Facebook:
                provider = new FacebookAuthProvider();
                break;
            case ProviderType.Apple:
                throw new Error('Apple provider not implemented');
                break;
            default:
                provider = new GoogleAuthProvider();
                break;
        }

        return from(
            signInWithPopup(this.auth, provider)
                .then(async result => {
                    try {
                        const userBM = new UserRegisterBM();
                        userBM.email = result.user.email ?? '';
                        userBM.username = result.user.displayName ?? '';
                        const headers = { Authorization: `Bearer ${await result.user.getIdToken()}` };
                        return await lastValueFrom(this.http.post(`/user/create/provider`, userBM, { headers }));
                    } catch (error) {
                        throw error;
                    }
                })
        ).pipe(
            catchError(error => {
                return throwError(() => error);
            })
        );
    }

    public logout(): Observable<void> {
        return from(signOut(this.auth));
    }

    public removeUser(user: User): Observable<boolean> {
        return this.http.delete<boolean>(`/user/remove`);
    }

    public getCurrentUserToken(): Observable<string | null> {
        return new Observable<string | null>(observer => {
            onAuthStateChanged(this.auth, user => {
                if (user) {
                    user.getIdToken().then(token => {
                        observer.next(token);
                        observer.complete();
                    }).catch(error => {
                        observer.error(error);
                    });
                } else {
                    observer.next(null);
                    observer.complete();
                }
            });
        });
    }

    public requestPasswordReset(email: string): Observable<void> {
        return from(sendPasswordResetEmail(this.auth, email))
    }

    public async requestEmailVerificationResend(userCred: UserCredential): Promise<void> {
        if (!userCred) return
        await sendEmailVerification(userCred.user);
    }
}