export interface IUserRegisterBM {
    email: string;
    password: string;
    username: string;
}

export class UserRegisterBM {
    email!: string;
    password!: string;
    username!: string;
    constructor(model?: IUserRegisterBM) {
        if (model) {
            this.email = model.email;
            this.password = model.password;
            this.username = model.username;
        }
    }
}