import * as React from 'react';
import { Link } from 'react-router-dom';

import { ButtonInterface, LinkButtonInterface } from '../interfaces/buttons';

const defaultBtnStyle: string = 'default-btn';

function Button({ label, onBtnClick, disabled, styleClass }: ButtonInterface) {
    return (
        <button className={styleClass || defaultBtnStyle} onClick={!!!disabled ? onBtnClick || (() => {}) : () => {}}>
            {label}
        </button>
    );
}

function LinkButton({ href, label, onBtnClick, disabled, styleClass }: LinkButtonInterface) {
    return (
        <Link to={href}>
            <Button label={label} styleClass={styleClass} onBtnClick={onBtnClick} disabled={disabled} />
        </Link>
    );
}

export { Button, LinkButton };
