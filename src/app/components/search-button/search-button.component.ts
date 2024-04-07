import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'search-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './search-button.component.html',
    styleUrl: './search-button.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchButtonComponent {}
