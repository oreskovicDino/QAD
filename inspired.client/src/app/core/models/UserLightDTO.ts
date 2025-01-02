import { AbstractControl } from "@angular/forms";

export interface IUserLightDTO {
    id: number;
    email: string;
    username: string;
}
export interface IUserLightDTOForm {
    id: AbstractControl<number>;
    email: AbstractControl<string>;
    username: AbstractControl<string>;
}
export class UserLightDTO {
    id!: number;
    email!: string;
    username!: string;
    constructor(model?: IUserLightDTO) {
        if (model) {
            this.id = model.id;
            this.email = model.email;
        }
    }
}