import * as React from 'react';
import { LinearInputInterface } from '../interfaces/inputs';

const defaultStyleClass: string = 'default-linear-input';

function LinearInput({ label, value, onChange, disabled, styleClass }: LinearInputInterface) {
    return (
        <div className={styleClass || defaultStyleClass}>
            <label>{label}</label>
            <input value={value} onChange={!!!disabled ? onChange : () => {}} />
        </div>
    );
}

export { LinearInput };
