import {animate, style, transition, trigger} from '@angular/animations';

export const enterLeaveSizeAnimation = trigger('enterLeaveSize', [
    transition(':enter', [
        style({height: 0, opacity: 0}),
        animate('150ms', style({height: '*', opacity: 1})),
    ]),
    transition(':leave', [
        style({height: '*', opacity: 1}),
        animate('150ms', style({height: 0, opacity: 0})),
    ]),
]);
