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

function StackedInput({
    label,
    errorMsg,
    onChange,
    onClick,
    disabled,
    styleClass,
    value,
    type,
}: StackedInputInterface) {
    return (
        <div className={styleClass || defaultStackedStyleClass}>
            <label>{label}</label>
            <input
                className={disabled ? 'disabled-btn' : ''}
                style={!!errorMsg ? { border: '1px solid red' } : {}}
                value={value || ''}
                disabled={disabled}
                onChange={onChange}
                onClick={onClick}
                type={type || 'text'}
            />
            {errorMsg && <span style={{ color: 'red' }}>{errorMsg}</span>}
        </div>
    );
}

export { LinearInput, StackedInput };
