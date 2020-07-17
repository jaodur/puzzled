import * as React from 'react';

import { cardType } from '../../../interfaces/card';
import { Ace, Cover, Eight, Five, Four, Jack, Joker, King, Nine, Queen, Seven, Six, Ten, Three, Two } from './ranks';

function cardContent(value: cardType) {
    const contentMapper: any = {
        A: <Ace value={value} />,
        2: <Two value={value} />,
        3: <Three value={value} />,
        4: <Four value={value} />,
        5: <Five value={value} />,
        6: <Six value={value} />,
        7: <Seven value={value} />,
        8: <Eight value={value} />,
        9: <Nine value={value} />,
        T: <Ten value={value} />,
        J: <Jack value={value} />,
        Q: <Queen value={value} />,
        K: <King value={value} />,
        V: <Joker value={value} />,
        C: <Cover value={value} />,
    };
    return contentMapper[value[0]];
}

export { cardContent };
