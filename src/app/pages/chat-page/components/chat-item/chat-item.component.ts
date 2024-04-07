import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatItemData} from '../../../../models';

@Component({
    selector: 'chat-item',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './chat-item.component.html',
    styleUrl: './chat-item.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatItemComponent {
    @Input({required: true}) data!: ChatItemData;
}
