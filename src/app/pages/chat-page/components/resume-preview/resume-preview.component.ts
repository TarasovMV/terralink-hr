import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    inject,
    Input,
    OnInit,
    Output,
    signal,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Resume} from '../../../../models';
import {TuiLoaderModule} from '@taiga-ui/core';
import {ApiService} from '../../../../services/api.service';

@Component({
    selector: 'resume-preview',
    standalone: true,
    imports: [CommonModule, TuiLoaderModule],
    templateUrl: './resume-preview.component.html',
    styleUrl: './resume-preview.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumePreviewComponent implements OnInit {
    @Output() closeClick = new EventEmitter<void>();

    private readonly apiService = inject(ApiService);

    readonly data = signal<Resume | null>(null);
    readonly status = signal<'loading' | 'success' | 'error'>('loading');

    ngOnInit(): void {
        this.apiService.getResume(1).subscribe({
            next: res => {
                this.data.set(res);
                this.status.set('success');
            },
            error: () => this.status.set('error'),
        });
    }
}
