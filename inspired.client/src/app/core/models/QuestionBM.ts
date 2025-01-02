import { AbstractControl } from "@angular/forms";

export interface IQuestionBM {
    title: string;
    body: string;
    excerpt: string;
}
export interface IQuestionBMForm {
    title: AbstractControl<string[]>;
    body: AbstractControl<string>;
    excerpt: AbstractControl<string[]>;
}
export class QuestionBM {
    title!: string;
    body!: string;
    excerpt!: string;
    constructor(model?: IQuestionBM) {
        if (model) {
            this.title = model.title;
            this.body = model.body;
            this.excerpt = model.excerpt;
        }
    }
}