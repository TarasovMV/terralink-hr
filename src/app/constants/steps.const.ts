import {Step, StepType} from '../models';

export const STEPS: Step<any>[] = [
    {
        type: StepType.Sphere,
        message: 'Выберите сферу',
        data: {
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
        }
    },
    {
        type: StepType.Specialization,
        message: 'Выберите специализацию',
        data: {
            tags: {
                ['database']: [
                    'nosql-разработчик',
                    'sql-разработчик',
                    'администратор баз данных',
                ],
                ['mobile_development']: [
                    'ios-разработчик',
                    'кросс-платформенный разработчик',
                    'android разработчик',
                ],
                ['cybersecurity']: [
                    'специалист информационной безопасности',
                    'этичный хакер',
                ],
                ['web_development']: [
                    'веб-мастер',
                    'веб-дизайнер',
                    'frontend-разработчик',
                    'backend-разработчик',
                ],
                ['dev_ops_ci_cd']: [
                    'инженер непрерывной интеграции развертывания',
                    'devops инженер',
                ],
                ['machine_learning']: [
                    'инженер по машинному обучению',
                    'data scientist',
                    'исследователь по машинному обучению',
                ],
                ['game_development']: [],
                ['ar/vr_development']: [
                    'ar/vr разработчик'
                ],
        },
        }
    },
    {
        type: StepType.University,
        message: 'Уточните образование',
        data: {
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
        }
    },
    {
        type: StepType.Experience,
        message: 'Уточните опыт работы',
        data: {
            tags: ['До 1 года', '1-3 года', '3-6 лет', 'Более 6 лет'],
        }
    },
    {
        type: StepType.SearchStatus,
        message: 'Уточните статус поиска',
        data: {
            tags: ['активно ищу работу', 'рассматриваю предложения'],
        }
    },
    {
        type: StepType.EmploymentType,
        message: 'Уточните тип занятости',
        data: {
            tags: ['Полная занятость', 'Частичная занятость'],
        }
    },
    {
        type: StepType.ResultWaiting,
        message: 'Ищем кандидатов по вашему запросу',
    },
    {
        type: StepType.Result,
        message: 'Мы подобрали для вас 5 лучших кандидатов',
    },
];
