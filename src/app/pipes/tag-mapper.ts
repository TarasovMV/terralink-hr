import {Pipe, PipeTransform} from '@angular/core';
import {StepType} from '../models';

@Pipe({
    name: 'tagMapper',
    standalone: true,
})
export class TagMapper implements PipeTransform {
    private readonly sphereMap = {
        ['database']: 'Специалист по базам данных',
        ['mobile_development']: 'Мобильная разработка',
        ['cybersecurity']: 'Кибербезопасность',
        ['web_development']: 'Веб-разработка',
        ['dev_ops_ci_cd']: 'DevOps инженерия',
        ['machine_learning']: 'Машинное обучение и искусственный интеллект',
        ['ar/vr_development']: 'AR/VR разработка',
        ['game_development']: 'Разработка игр',
        ['ar/vr разработчик']: 'AR/VR-разработчик',
    } as const;

    private readonly searchStatusMap = {
        ['активно ищу работу']: 'В активном поиске',
        ['рассматриваю предложения']: 'Рассматривает предложения',
    } as const;

    private readonly allMap = {
        ['all']: 'Не имеет значения'
    } as const;

    transform(value: string, type: StepType): string {
        if (this.allMap[value as keyof typeof this.allMap]) {
            return this.allMap[value as keyof typeof this.allMap];
        }

        if (type === StepType.Sphere) {
            return this.sphereMap[value as keyof typeof this.sphereMap] || '';
        }

        if (type === StepType.SearchStatus) {
            return this.searchStatusMap[value as keyof typeof this.searchStatusMap] || '';
        }

        return value;
    }
}
