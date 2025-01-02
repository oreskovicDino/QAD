import { AbstractControl } from "@angular/forms";

export interface IUserRegisterBM {
    email: string;
    password: string;
    passwordRepeat: string;
    username: string;
}
export interface IUserRegisterBMForm {
    email: AbstractControl<string|null>;
    password: AbstractControl<string|null>;
    passwordRepeat: AbstractControl<string|null>;
    username: AbstractControl<string|null>;
}
export class UserRegisterBM {
    email!: string;
    password!: string;
    passwordRepeat!: string;
    username!: string;
    constructor(model?: IUserRegisterBM) {
        if (model) {
            this.email = model.email;
            this.password = model.password;
            this.passwordRepeat = model.passwordRepeat;
            this.username = model.username;
        }
    }
}