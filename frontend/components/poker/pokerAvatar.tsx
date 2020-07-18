import * as React from 'react';

import { SimpleAvatar } from '../commons/avatar';
import { Card, Tilt } from '../icons/cards';
import { PokerAvatarInterface } from '../interfaces/poker';

function PokerAvatar({ className, profileName, src, tiltClass, dealer }: PokerAvatarInterface) {
    return (
        <div className={className}>
            <Tilt className={`horizontal-card-tilt ${tiltClass}`}>
                <Card value={'CR'} size={'tiny'} />
                <Card value={'CR'} size={'tiny'} />
            </Tilt>
            {dealer && <span className={'dealer'}>D</span>}
            <SimpleAvatar profileName={profileName} src={src} />
            <div>
                <span>{profileName}</span>
                <span>10008738</span>
            </div>
        </div>
    );
}

export { PokerAvatar };
