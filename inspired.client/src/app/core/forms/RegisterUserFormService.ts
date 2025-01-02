import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { IUserRegisterBM, IUserRegisterBMForm } from "../models/UserRegisterBM";

@Injectable({ providedIn: 'root' })
export class RegisterFormService {

    constructor(private _formBuilder: FormBuilder) { }
    public getForm(): FormGroup<IUserRegisterBMForm> {
        const formGroup = this._formBuilder.group<IUserRegisterBMForm>({
            username: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6), Validators.maxLength(250),]),
            email: new FormControl<string | null>(null, [Validators.required, Validators.email],),
            password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8), passwordComplexValidator()]),
            passwordRepeat: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8)]),
        }, { validators: passwordMatchValidator() });
        setTimeout(() => {
            formGroup.markAsPristine();
            formGroup.markAsUntouched();
        }, 1)
        return formGroup;
    }

    public patchValues(form: FormGroup, model: IUserRegisterBM | any, options: { emitEvent: boolean } = { emitEvent: true }) {

        form.patchValue(model, options);
        setTimeout(() => {
            form.markAsPristine();
            form.markAsUntouched();
        }, 1)
    }
}

export function passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const confirmPassword = control.get('passwordRepeat');
        if (!password || !confirmPassword) {
            return null;
        }
        if (password.value !== confirmPassword.value) {
            const passwordMismatch = { passwordMismatch: { value: control.value } }
            confirmPassword.setErrors(passwordMismatch);
            return passwordMismatch;
        }
        return null
    };
}

export function passwordComplexValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }
        const error: any = {};
        const hasNumber = /\d/.test(control.value);
        const hasUpper = /[A-Z]/.test(control.value);
        const hasLower = /[a-z]/.test(control.value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);

        if (!hasNumber) error['hasNumber'] = { value: control.value };
        if (!hasUpper) error['hasUpper'] = { value: control.value };
        if (!hasLower) error['hasLower'] = { value: control.value };
        if (!hasSpecialChar) error['hasSpecialChar'] = { value: control.value };

        if (hasNumber && hasUpper && hasLower && hasSpecialChar) {
            return null;
        }
        return error
    };
}