import { AbstractControl } from "@angular/forms";

export interface IQuestionLightDTO {
    id: number;
    title: string;
    excerpt: string;
}
export interface IQuestionLightDTOForm {
    id: number;
    title: AbstractControl<string[]>;
    excerpt: AbstractControl<string[]>;
}
export class QuestionLightDTO {
    public id!: number;
    public title!: string;
    public excerpt!: string;

    constructor(model?: IQuestionLightDTO) {
        if (model) {
            this.id = model.id;
            this.title = model.title;
            this.excerpt = model.excerpt;
        }
    }
}