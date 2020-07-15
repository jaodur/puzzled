import * as React from 'react';

import { CardInterface } from '../../../../interfaces/card';

function Cover({ value }: CardInterface) {
    return <rect fill={`url(#${value}1)`} width="204" height="300" x="-102" y="-150" rx="12" ry="12" />;
}

export { Cover };
