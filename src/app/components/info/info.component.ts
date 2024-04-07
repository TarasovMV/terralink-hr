import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'info',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './info.component.html',
    styleUrl: './info.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent {}
