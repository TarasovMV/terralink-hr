import {TuiRootModule, TuiDialogModule, TuiAlertModule} from '@taiga-ui/core';
import {Component, inject} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MaxHeightService} from './services/max-height.service';

@Component({
    standalone: true,
    imports: [RouterModule, TuiRootModule, TuiDialogModule, TuiAlertModule],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
})
export class AppComponent {
    constructor() {
        inject(MaxHeightService).handleMaxSize();
    }
}
