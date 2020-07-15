import * as React from 'react';

import { CardInterface } from '../../../../interfaces/card';

function King({ value }: CardInterface) {
    return (
        <>
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}1`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}1`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}2`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}2`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}3`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}3`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}4`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}4`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}5`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}5`} />
            <use width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}6`} />
            <use transform="rotate(180)" width="160.8" height="256.8" x="-80.4" y="-128.4" xlinkHref={`#${value}6`} />
            <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
            <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
            <use xlinkHref={`#S${value}`} height="54.28" x="-84.439" y="-129.86" />
            <g transform="rotate(180)">
                <use xlinkHref={`#V${value}`} height="32" x="-112.4" y="-154" />
                <use xlinkHref={`#S${value}`} height="26.769" x="-109.784" y="-117" />
                <use xlinkHref={`#S${value}`} height="54.28" x="-84.439" y="-129.86" />
            </g>
            <use xlinkHref={`#X${value}`} stroke="#44F" fill="none" />
        </>
    );
}

export { King };
