import { AbstractControl } from "@angular/forms";
import { QuestionLightDTO } from "./QuestionLightDTO";
import { ReplyLightDTO } from "./ReplyLightDTO";

export interface IUserDTO {
    id: number;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    questions: QuestionLightDTO[];
    replies: ReplyLightDTO[];
}
export interface IUserDTOForm {
    id: AbstractControl<number>;
    username: AbstractControl<string>;
    email: AbstractControl<string[]>;
    createdAt: AbstractControl<Date>;
    updatedAt: AbstractControl<Date>;
}
export class UserDTO {
    id!: number;
    username!: string;
    email!: string;
    createdAt!: Date;
    updatedAt!: Date;
    questions!: QuestionLightDTO[];
    replies!: ReplyLightDTO[];

    constructor(model?: IUserDTO) {
        if (model) {
            this.id = model.id;
            this.username = model.username;
            this.email = model.email;
            this.createdAt = model.createdAt;
            this.updatedAt = model.updatedAt;
            this.questions = model.questions;
            this.replies = model.replies;
        }
    }
}