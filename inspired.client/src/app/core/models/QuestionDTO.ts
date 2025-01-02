import { AbstractControl } from "@angular/forms";
import { UserLightDTO } from "./UserLightDTO";
import { ReplyLightDTO } from "./ReplyLightDTO";

export interface IQuestionDTO {
    id: number;
    title: string;
    body: string;
    excerpt: string;
    createdAt: Date;
    updatedAt: Date;
    user: UserLightDTO;
    replies: ReplyLightDTO[];
}
export interface IQuestionDTOForm {
    id: number;
    title: AbstractControl<string[]>;
    body: AbstractControl<string>;
    excerpt: AbstractControl<string[]>;
    createdAt: AbstractControl<Date>;
    updatedAt: AbstractControl<Date>;
    user: UserLightDTO;
    replies: ReplyLightDTO[];
}
export class QuestionDTO {
    id!: number;
    title!: string;
    body!: string;
    excerpt!: string;
    createdAt!: Date;
    updatedAt!: Date;
    user!: UserLightDTO;
    replies!: ReplyLightDTO[];
    constructor(model?: IQuestionDTO) {
        if (model) {
            this.title = model.title;
            this.body = model.body;
            this.excerpt = model.excerpt;
            this.createdAt = model.createdAt;
            this.updatedAt = model.updatedAt;
            this.id = model.id;
            this.user = model.user;
            this.replies = model.replies;
        }
    }
}