import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserLoginBM } from '../../core/models/UserLoginBM';
import { ProviderType } from '../../core/enums/ProviderType';
import { NotVerifiedError } from '../../core/utils/NotVerifiedError';
import { UserCredential } from 'firebase/auth';

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDividerModule],
    selector: 'auth-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class AuthLoginComponent implements OnInit {
    public loginForm: FormGroup;
    public message: string = '';
    public providerType = ProviderType;
    public isNotVerified: boolean = false;
    public verificationSentMessage: string = "";
    private userCredentials: UserCredential | null = null;

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    public onSubmit() {
        const user = new UserLoginBM(this.loginForm.getRawValue());
        this.authService.login(user.email, user.password)
            .then((userCredentials: UserCredential | null) => {
                if (userCredentials) {
                    this.message = "Email not verified. Please verify your email before logging in.";
                    this.isNotVerified = true;
                    this.userCredentials = userCredentials;
                } else {
                    this.router.navigate(['/dashboard']);
                }
            })
            .catch((err) => {
                if (err instanceof NotVerifiedError) {
                    this.message = err.message;
                    return;
                }
                this.message = "Something went wrong";
            })
    }

    public providerLogin(providerType: ProviderType) {
        this.authService.loginWithProvider(providerType)
            .then(() => this.router.navigate(['/dashboard']))
            .catch((err) => this.message = err.error)
    }


    public navigateToRegistration() {
        this.router.navigate(['/auth/register']);
    }
    public navigateToForgottenPass() {
        this.router.navigate(['/auth/forgotten-password']);
    }

    public async requestEmailVerificationResend(): Promise<void> {
        try {
            if (!this.userCredentials) return;
            await this.authService.requestEmailVerificationResend(this.userCredentials)
            this.verificationSentMessage = "Email with verification link was sent"
            this.message = ""
            this.isNotVerified = false;
        } catch (error) {
            this.message = "Something went wrong!"
        }
    }

    ngOnInit() { }
}