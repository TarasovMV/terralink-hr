import {StepType} from './step-type.enum';

export interface Step {
    type: StepType;
    message: string;
    tags: string[];
}
