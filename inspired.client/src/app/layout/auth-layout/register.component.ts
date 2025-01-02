import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RegisterFormService } from '../../core/forms/RegisterUserFormService';
import { UserRegisterBM } from '../../core/models/UserRegisterBM';
import { UserService } from '../../core/services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { ProviderType } from '../../core/enums/ProviderType';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDividerModule,
        MatIconModule
    ],
    selector: 'auth-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.scss']
})

export class AuthRegisterComponent implements OnInit {
    public registerForm: FormGroup;
    public message: string = '';
    public providerType = ProviderType;

    constructor(private router: Router, private authService: AuthService, private userService: UserService, private registerFormService: RegisterFormService) {
        this.registerForm = registerFormService.getForm();
    }
    public navigateToLogin() {
        this.router.navigate(['/auth/login']);
    }
    public onSubmit() {
        const user = new UserRegisterBM(this.registerForm.getRawValue());
        this.authService.register(user).subscribe({
            next: () => {
                console.log("Next");
                this.navigateToLogin();
            },
            error: (err) => {
                this.message = err.error;
            }
        });
    }

    public providerRegister(providerType: ProviderType) {
        this.authService.providerRegister(providerType).subscribe({
            next: () => {
                this.navigateToLogin();
            },
            error: (err) => {
                console.log(err);
                
                this.message = err.error.message;
            }
        });
    }

    ngOnInit() { }
}