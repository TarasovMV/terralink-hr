import {Pipe, PipeTransform} from '@angular/core';
import {StepType} from '../models';

@Pipe({
    name: 'tagMapper',
    standalone: true,
})
export class TagMapper implements PipeTransform {
    readonly specializationMap = {
        ['database']: 'Специалист по базам данных',
        ['mobile_development']: 'Мобильная разработка',
        ['cybersecurity']: 'Кибербезопасность',
        ['web_development']: 'Веб-разработка',
        ['dev_ops_ci_cd']: 'DevOps инженерия',
        ['machine_learning']: 'Машинное обучение и искусственный интеллект',
        ['ar/vr_development']: 'AR/VR разработка',
        ['game_development']: 'Разработка игр',
        ['активно ищу работу']: 'В активном поиске',
        ['рассматриваю предложения']: 'Рассматривает предложения',
        ['ar/vr разработчик']: 'AR/VR-разработчик',
    } as const;

    transform(value: string, type: StepType): string {
        if (type !== StepType.Specialization) {
            return value;
        }

        return this.specializationMap[value as keyof typeof this.specializationMap] || '';
    }
}
