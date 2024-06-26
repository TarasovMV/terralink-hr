import {animate, style, transition, trigger} from '@angular/animations';

export const enterLeaveAnimation = trigger('enterLeave', [
    transition(':enter', [style({opacity: 0}), animate('150ms', style({opacity: 1}))]),
    transition(':leave', [style({opacity: 1}), animate('150ms', style({opacity: 0}))]),
]);
