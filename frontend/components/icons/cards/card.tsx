import * as React from 'react';

import { CardInterface } from '../../interfaces/card';
import { cardContent } from './normal/contentSwitch';
import { Clubs, Covers, Diamonds, Hearts, Jokers, Spades } from './normal/suites';

function Card({ value, className, size = 'small' }: CardInterface) {
    const sizeMapper = {
        tiny: '30px',
        xSmall: '50px',
        small: '70px',
    };
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="xMinYMid"
            viewBox="-132 -180 264 360"
            className={className}
            width={sizeMapper[size]}>
            <Clubs />
            <Diamonds />
            <Hearts />
            <Spades />
            <Jokers />
            <Covers />
            <rect x="-240" y="-336" width="480" height="672" fill="transparent" />
            <rect width="239" height="335" x="-119.5" y="-167.5" rx="12" ry="12" fill="white" stroke="black" />
            {cardContent(value)}
        </svg>
    );
}

export { Card };
