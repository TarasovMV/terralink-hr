import {Injectable} from '@angular/core';
import {delay, Observable, of} from 'rxjs';
import {Result} from '../models';
import {RESULT} from '../constants';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    getResult(query: string): Observable<Result> {
        return of(RESULT).pipe(delay(3_000));
    }
}
