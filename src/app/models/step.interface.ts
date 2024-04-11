import {StepType} from './step-type.enum';

export interface Step<T> {
    type: StepType;
    message: string;
    data?: T;
}
