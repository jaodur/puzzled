import * as React from 'react';
import { LinearInputInterface, StackedInputInterface } from '../interfaces/inputs';

const defaultStyleClass: string = 'default-linear-input';
const defaultStackedStyleClass: string = 'default-stacked-input';

function LinearInput({ label, value, onChange, disabled, styleClass }: LinearInputInterface) {
    return (
        <div className={styleClass || defaultStyleClass}>
            <label>{label}</label>
            <input value={value} onChange={!!!disabled ? onChange || (() => {}) : () => {}} />
        </div>
    );
}

function StackedInput({ label, value, onChange, disabled, styleClass }: StackedInputInterface) {
    return (
        <div className={styleClass || defaultStackedStyleClass}>
            <label>{label}</label>
            <input value={value} onChange={!!!disabled ? onChange || (() => {}) : () => {}} />
        </div>
    );
}

export { LinearInput, StackedInput };
