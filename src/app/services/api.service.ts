import {Injectable} from '@angular/core';
import {delay, Observable, of} from 'rxjs';
import {Result, Resume} from '../models';
import {RESULT} from '../constants';
import {RESUME} from '../constants/resume.const';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    getResult(query: string): Observable<Result> {
        return of(RESULT).pipe(delay(3_000));
    }

    getResume(id: number): Observable<Resume> {
        return of(RESUME).pipe(delay(500));
    }
}
