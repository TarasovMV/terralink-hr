import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResultItem} from '../../../../models';

@Component({
    selector: 'resume-item',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './resume-item.component.html',
    styleUrl: './resume-item.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeItemComponent {
    @Input({required: true}) data!: ResultItem;
}
