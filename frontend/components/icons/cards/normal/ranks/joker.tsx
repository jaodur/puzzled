import * as React from 'react';

import { CardInterface } from '../../../../interfaces/card';

function Joker({ value }: CardInterface) {
    return (
        <>
            <use width="197.6" height="304" x="-98.8" y="-152" xlinkHref={`#${value}1`} />
            <use width="197.6" height="304" x="-98.8" y="-152" xlinkHref={`#${value}2`} />
            <use width="197.6" height="304" x="-98.8" y="-152" xlinkHref={`#${value}3`} />
            <use width="197.6" height="304" x="-98.8" y="-152" xlinkHref={`#${value}4`} />
        </>
    );
}

export { Joker };
