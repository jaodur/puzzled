import * as React from 'react';

import { ButtonInterface } from "../interfaces/buttons";

const defaultBtnStyle: string = 'default-btn';

function Button({label, onBtnClick, disabled, styleClass}: ButtonInterface){
    return (
       <button
           className={styleClass || defaultBtnStyle}
           onClick={!!!disabled ? onBtnClick || (() => {}) : () => {}}
       >
           {label}
       </button>
    )
}

export { Button }
