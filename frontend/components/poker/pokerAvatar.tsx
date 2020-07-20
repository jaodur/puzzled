import * as React from 'react';

import { SimpleAvatar } from '../commons/avatar';
import { AddUserIcon } from '../icons/addUser';
import { Card, Tilt } from '../icons/cards';
import { ElementInterface } from '../interfaces/interfaces';
import { PokerAvatarInterface } from '../interfaces/poker';

function EmptySeat({ className }: ElementInterface) {
    return (
        <SimpleAvatar profileName={''} className={className}>
            <AddUserIcon />
        </SimpleAvatar>
    );
}

function OccupiedSeat({ profileName, src, tiltClass, dealer, currentPlayer }: PokerAvatarInterface) {
    return (
        <>
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
        </>
    );
}

function PokerAvatar({ className, profileName, src, tiltClass, dealer, currentPlayer }: PokerAvatarInterface) {
    return (
        <div className={`${className} ${currentPlayer && 'p-c-player'}`}>
            {profileName ? (
                <OccupiedSeat
                    profileName={profileName}
                    src={src}
                    tiltClass={tiltClass}
                    dealer={dealer}
                    currentPlayer={currentPlayer}
                />
            ) : (
                <EmptySeat className={'empty-seat'} />
            )}
        </div>
    );
}

export { PokerAvatar };
