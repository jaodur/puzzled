import * as React from 'react';

import { SimpleAvatar } from '../commons/avatar';
import { Card, Tilt } from '../icons/cards';
import { PokerAvatarInterface } from '../interfaces/poker';

function PokerAvatar({ className, profileName, src, tiltClass }: PokerAvatarInterface) {
    return (
        <div className={className}>
            <Tilt className={tiltClass}>
                <Card value={'CR'} size={'tiny'} />
                <Card value={'CR'} size={'tiny'} />
            </Tilt>
            <SimpleAvatar profileName={profileName} src={src} />
            <div>
                <span>{profileName}</span>
                <span>10008738</span>
            </div>
        </div>
    );
}

export { PokerAvatar };
