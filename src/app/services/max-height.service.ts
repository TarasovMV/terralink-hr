import {inject, Injectable} from '@angular/core';
import {WINDOW} from '@ng-web-apis/common';

@Injectable({
    providedIn: 'root',
})
export class MaxHeightService {
    handleMaxSize(): void {
        const vh = inject(WINDOW).innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        window.addEventListener('resize', () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    }
}
