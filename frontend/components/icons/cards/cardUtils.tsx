import * as React from 'react';

import { ElementInterface } from '../../interfaces/interfaces';

function Tilt({ className, children, style }: ElementInterface) {
    return (
        <div className={className} style={style || {}}>
            {children}
        </div>
    );
}

export { Tilt };
