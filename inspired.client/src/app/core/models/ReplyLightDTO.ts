import { AbstractControl } from "@angular/forms";

export interface IReplyLightDTO {
    id: number;
    body: string;
    ownerUsername: string;
    ownerId: string;
}
export interface IReplyLightDTOForm {
    id: AbstractControl<number>;
    body: AbstractControl<string>;
    ownerUsername: AbstractControl<string>;
    ownerId: AbstractControl<string>;
}
export class ReplyLightDTO {
    id!: number;
    body!: string;
    ownerUsername!: string;
    ownerId!: string;
    constructor(model?: IReplyLightDTO) {
        if (model) {
            this.id = model.id;
            this.body = model.body;
            this.ownerUsername = model.ownerUsername;
            this.ownerId = model.ownerId;
        }
    }
}