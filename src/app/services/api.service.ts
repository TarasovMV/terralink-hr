import {inject, Injectable} from '@angular/core';
import {delay, Observable, of} from 'rxjs';
import {Result, Resume} from '../models';
import {RESULT} from '../constants';
import {RESUME} from '../constants/resume.const';
import {HttpClient} from '@angular/common/http';

const URL = `https://orchestra.terralink.ru/resume/api`;

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private readonly http = inject(HttpClient);

    getResult(query: string): Observable<Result> {
        // return of(RESULT).pipe(delay(3_000));
        return this.http.post<Result>(`${URL}/resume/find?query=${query}`, {});
    }

    getResume(id: number): Observable<Resume> {
        // return of(RESUME).pipe(delay(500));
        return this.http.get<Resume>(`${URL}/resume/${id}`);
    }
}
