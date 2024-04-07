import {Step, StepType} from '../models';

export const STEPS: Step[] = [
    {
        type: StepType.Specialization,
        message: 'Выберите специализацию',
        tags: [
            'database',
            'mobile_development',
            'cybersecurity',
            'web_development',
            'dev_ops_ci_cd',
            'machine_learning',
            'game_development',
            'ar/vr_development',
        ],
    },
    {
        type: StepType.University,
        message: 'Уточните образование',
        tags: [
            'Университет ИТМО',
            'Московский государственный университет',
            'Высшая школа экономики',
            'Национальный исследовательский ядерный университет МИФИ',
            'Санкт-Петербургский государственный университет',
            'Московский государственный технический университет имени Н.Э. Баумана',
            'Томский политехнический университет',
            'Московский физико-технический институт',
            'Новосибирский государственный технический университет',
            'Санкт-Петербургский государственный политехнический университет Петра Великого',
        ],
    },
    {
        type: StepType.Experience,
        message: 'Уточните опыт работы',
        tags: ['До 1 года', '1-3 года', '3-6 лет', 'Более 6 лет'],
    },
    {
        type: StepType.SearchStatus,
        message: 'Уточните статус поиска',
        tags: ['Активно ищу работу', 'Рассматриваю предложения'],
    },
    {
        type: StepType.EmploymentType,
        message: 'Уточните тип занятости',
        tags: ['Полная занятость', 'Частичная занятость'],
    },
    {
        type: StepType.ResultWaiting,
        message: 'Ищем кандидатов по вашему запросу',
        tags: [],
    },
    {
        type: StepType.Result,
        message: 'Мы подобрали для вас 5 лучших кандидатов',
        tags: [],
    },
];
