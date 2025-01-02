import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatDividerModule
    ],
    selector: 'forgotten-password',
    templateUrl: './forgotten-password.component.html'
})

export class ForgottenPasswordComponent implements OnInit {
    public forgottenForm: FormGroup;
    public message: string = '';

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
        this.forgottenForm = fb.group({
            email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
        })
    }
    public onSubmit() {
        this.authService.requestPasswordReset(this.forgottenForm.get('email')?.getRawValue())
            .subscribe(() => {
                this.navigateToLogin();
            });
    }

    public navigateToLogin() {
        this.router.navigate(['/auth/login']);
    }
    ngOnInit() { }
}