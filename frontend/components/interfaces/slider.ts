import { ElementInterface } from './interfaces';

interface SliderInterface extends ElementInterface {
    value: number;
    min: number;
    max: number;
    step?: number;
    marks?: any[];
}

export { SliderInterface };
