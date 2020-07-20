import * as React from 'react';

import { CardInterface } from '../../../../interfaces/card';

function Five({ value }: CardInterface) {
    return (
        <>
            <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
            <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
            <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-133.165" />
            <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-133.165" />
            <use xlinkHref={`#S${value}`} height="65" x="-32.5" y="-32.5" />
            <g transform="rotate(180)">
                <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
                <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
                <use xlinkHref={`#S${value}`} height="65" x="-85.084" y="-133.165" />
                <use xlinkHref={`#S${value}`} height="65" x="20.084" y="-133.165" />
            </g>
        </>
    );
}

export { Five };
