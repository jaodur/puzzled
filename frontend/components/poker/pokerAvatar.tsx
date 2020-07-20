import * as React from 'react';

import { SimpleAvatar } from '../commons/avatar';
import { Card, Tilt } from '../icons/cards';
import { PokerAvatarInterface } from '../interfaces/poker';

function PokerAvatar({ className, profileName, src, tiltClass, dealer, currentPlayer }: PokerAvatarInterface) {
    return (
        <div className={`${className} ${currentPlayer && 'p-c-player'}`}>
            <Tilt className={`horizontal-card-tilt ${tiltClass}`}>
                <Card value={'CR'} size={'tiny'} />
                <Card value={'CR'} size={'tiny'} />
            </Tilt>
            {dealer && <span className={'dealer'}>D</span>}
            <SimpleAvatar profileName={profileName} src={src} />
            <div className={'p-c-player-info'}>
                <span>{currentPlayer ? 'You' : profileName}</span>
                <span>10008738</span>
            </div>
        </div>
    );
}

export { PokerAvatar };
