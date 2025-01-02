import { AbstractControl } from "@angular/forms";

export interface IUserLoginBM {
    email: string;
    password: string;
}
export interface IUserLoginBMForm {
    email: AbstractControl<string | null>;
    password: AbstractControl<string | null>;
}

export class UserLoginBM {
    email!: string;
    password!: string;
    username!: string;
    constructor(model?: IUserLoginBM) {
        if (model) {
            this.email = model.email;
            this.password = model.password;
        }
    }
}