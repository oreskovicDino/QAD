import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionBM } from '../models/QuestionBM';
import { QuestionLightDTO } from '../models/QuestionLightDTO';

@Injectable({ providedIn: 'root' })
export class QuestionService {
    constructor(private httpClient: HttpClient) { }

    public getUserQuestions = (): Observable<QuestionLightDTO[]> => {
        return this.httpClient.get<QuestionLightDTO[]>(`/questions/user/list`);
    }
    public createUserQuestion = (model: Partial<QuestionBM> | QuestionBM): Observable<QuestionBM> => {
        return this.httpClient.post<QuestionBM>(`/questions/create`, model);
    };
}