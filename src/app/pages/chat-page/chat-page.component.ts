import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    DestroyRef,
    ElementRef,
    inject,
    signal,
    ViewChild,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfoComponent} from '../../components/info/info.component';
import {SearchButtonComponent} from '../../components/search-button/search-button.component';
import {enterLeaveAnimation, enterLeaveSizeAnimation} from '../../animations';
import {ChatItemComponent} from './components/chat-item/chat-item.component';
import {BOT_USER, CURRENT_USER, STEPS} from '../../constants';
import {TuiScrollbarComponent, TuiScrollbarModule} from '@taiga-ui/core';
import {ChatItemData, ResultItem, StepType} from '../../models';
import {TagMapper} from '../../pipes/tag-mapper';
import {ApiService} from '../../services/api.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ResumeItemComponent} from './components/resume-item/resume-item.component';
import {TuiSidebarModule} from '@taiga-ui/addon-mobile';
import {TuiActiveZoneModule} from '@taiga-ui/cdk';
import {ResumePreviewComponent} from './components/resume-preview/resume-preview.component';

interface ChatMessage {
    data: ChatItemData;
    side: 'left' | 'right';
    stepType?: StepType;
}

type MessageAction = 'tag' | 'result';

const INITIAL_STEP_INDEX = -1;
const CHAT_DELAY = 1_000;
const TAG_STEPS = [
    StepType.Sphere,
    StepType.University,
    StepType.Specialization,
    StepType.Experience,
    StepType.SearchStatus,
    StepType.EmploymentType,
];

@Component({
    selector: 'chat-page',
    standalone: true,
    templateUrl: './chat-page.component.html',
    styleUrl: './chat-page.component.less',
    imports: [
        CommonModule,
        InfoComponent,
        SearchButtonComponent,
        ChatItemComponent,
        TuiScrollbarModule,
        TuiSidebarModule,
        TagMapper,
        ResumeItemComponent,
        TuiActiveZoneModule,
        ResumePreviewComponent,
    ],
    animations: [enterLeaveAnimation, enterLeaveSizeAnimation],
    providers: [TagMapper],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent {
    @ViewChild(TuiScrollbarComponent, {read: ElementRef})
    private readonly scrollBar?: ElementRef<HTMLElement>;

    private readonly stepIdx = signal<number>(INITIAL_STEP_INDEX);
    private result: string[] = [];

    private readonly apiService = inject(ApiService);
    private readonly tagMapper = inject(TagMapper);
    private readonly cdRef = inject(ChangeDetectorRef);
    private readonly destroyRef = inject(DestroyRef);

    readonly showPreview = signal<boolean>(true);
    readonly chatMessages = signal<ChatMessage[]>([]);
    readonly messageAction = signal(new Map<ChatMessage, MessageAction | null>());
    readonly resultResumes = signal(new Map<ChatMessage, ResultItem[]>());
    readonly currentStep = computed(() => {
        const idx = this.stepIdx();

        if (idx < 0) {
            return null;
        }

        return STEPS[idx];
    });

    readonly showSidebar = signal(new Map<ResultItem, boolean>());

    start(): void {
        this.clear();
        this.showPreview.set(false);
        this.pushChatMessage({
            data: {
                author: CURRENT_USER,
                message: 'Поиск кандидата',
            },
            side: 'left',
        });

        this.goToNextStep();
    }

    restart(): void {
        this.clear();
        this.pushChatMessage({
            data: {
                author: CURRENT_USER,
                message: 'Поиск кандидата',
            },
            side: 'left',
        });

        this.goToNextStep();
    }

    chooseTag(tag: string, stepType: StepType, message: ChatMessage): void {
        if (tag === 'all') {
            this.result.push(...this.getTagsByStepType(stepType));
        } else {
            this.result.push(tag);
        }

        this.messageAction.update(m => m.set(message, null));
        this.pushChatMessage({
            data: {
                author: CURRENT_USER,
                message: this.tagMapper.transform(tag, stepType),
            },
            side: 'left',
        });

        if (stepType === StepType.Sphere && !this.getTagsByStepType(StepType.Specialization).length) {
            this.goToStep(this.stepIdx() + 2);
        } else {
            this.goToNextStep();
        }

        if (this.currentStep()?.type === StepType.ResultWaiting) {
            this.getResult();

            return;
        }
    }

    setShowResume(res: ResultItem, value: boolean): void {
        this.showSidebar.update(m => m.set(res, value));
    }

    canChooseAll(type: StepType): boolean {
        return [StepType.University, StepType.SearchStatus, StepType.EmploymentType].includes(type);
    }

    getTagsByStepType(type: StepType): string[] {
        if (type === StepType.Specialization) {
            const sphere = this.result[0];

            return STEPS.find(s => s.type === StepType.Specialization)?.data.tags[sphere] ?? [];
        }

        return STEPS.find(s => s.type === type)?.data.tags ?? [];
    }

    private clear(): void {
        this.result = [];
        this.chatMessages.set([]);
        this.stepIdx.set(-1);
    }

    private getResult(): void {
        const searchQuery = this.result.join(', ');

        this.apiService
            .getResult(searchQuery)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: res => {
                    const message = this.goToStepByType(StepType.Result);

                    if (!message) {
                        return;
                    }

                    this.resultResumes.update(m => m.set(message, res.content));
                },
            });
    }

    private goToStepByType(type: StepType): ChatMessage | null {
        const stepIdx = STEPS.findIndex(s => s.type === type);

        if (stepIdx < 0) {
            return null;
        }

        return this.goToStep(stepIdx);
    }

    private goToNextStep(): ChatMessage {
        return this.goToStep(this.stepIdx() + 1);
    }

    private goToStep(idx: number): ChatMessage {
        this.stepIdx.set(idx);
        const step = this.currentStep() ?? undefined;

        const message = this.pushChatMessage(
            {
                data: {
                    author: BOT_USER,
                    message: this.currentStep()?.message || '',
                },
                stepType: step?.type,
                side: 'right',
            },
            true,
        );

        if (step?.type && TAG_STEPS.includes(step.type)) {
            this.messageAction.update(m => m.set(message, 'tag'));
        }

        if (step?.type && step.type === StepType.Result) {
            this.messageAction.update(m => m.set(message, 'result'));
        }

        return message;
    }

    private pushChatMessage(message: ChatMessage, withDelay = false): ChatMessage {
        const delay = withDelay ? CHAT_DELAY : 0;

        setTimeout(() => {
            this.chatMessages.update(messages => [...messages, message]);
            setTimeout(() => this.scrollToBottom(), 150);
        }, delay);

        return message;
    }

    private scrollToBottom(): void {
        const nativeElement = this.scrollBar?.nativeElement;

        if (!nativeElement) {
            return;
        }

        nativeElement.scrollTo({top: nativeElement.scrollHeight, behavior: 'smooth'});

        this.cdRef.detectChanges();
    }
}
