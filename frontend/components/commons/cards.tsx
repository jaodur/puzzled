import * as React from 'react';

import { ElementInterface, GameIntroInterface } from '../interfaces/interfaces';
import { RouterLink } from './links';

function GameCard({ name, src, link }: GameIntroInterface) {
    return (
        <RouterLink link={link}>
            <div className={'card 1'}>
                <div className="card_image">
                    <img src={src} />
                </div>
                <div className="card_title title-white">
                    <p>{name}</p>
                </div>
            </div>
        </RouterLink>
    );
}

function GameCards({ className, children }: ElementInterface) {
    return <div className={className || 'cards-list'}>{children}</div>;
}

export { GameCard, GameCards };
