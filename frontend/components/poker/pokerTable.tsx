import * as React from 'react';

import { Card } from '../icons/cards';
import { ElementInterface } from '../interfaces/interfaces';
import { PokerAvatar } from './pokerAvatar';
import { PokerController } from './pokerController';

function TableContent({ children, className }: ElementInterface) {
    return <div className={className}>{children}</div>;
}

function PokerTable() {
    return (
        <div className={'c-poker-table'}>
            <div className={'poker-table'}>
                <TableContent className={'p-table-content'}>
                    <Card value={'TH'} />
                    <Card value={'7C'} />
                    <Card value={'2S'} />
                    <Card value={'QH'} />
                    <Card value={'JH'} />
                </TableContent>
                <PokerAvatar
                    className={'t-avatar av-bnl'}
                    tiltClass={'t-bnl'}
                    profileName={'ja-odur'}
                    src={'https://i.pravatar.cc/150?img=3'}
                    dealer
                />
                <PokerAvatar
                    className={'t-avatar av-bt'}
                    tiltClass={'t-bt'}
                    profileName={'ja-odur'}
                    currentPlayer
                    // dealer
                    src={'https://i.pravatar.cc/150?img=3'}
                />
                <PokerAvatar
                    className={'t-avatar av-bnr'}
                    tiltClass={'t-bnr'}
                    profileName={'ja-odur'}
                    dealer
                    src={'https://i.pravatar.cc/150?img=3'}
                />
                <PokerAvatar
                    className={'t-avatar av-tnl'}
                    tiltClass={'t-tnl'}
                    profileName={'ja-odur'}
                    src={'https://i.pravatar.cc/150?img=3'}
                />
                <PokerAvatar
                    className={'t-avatar av-tp'}
                    tiltClass={'t-tp'}
                    profileName={'ja-odur'}
                    src={'https://i.pravatar.cc/150?img=3'}
                />
                <PokerAvatar
                    className={'t-avatar av-tnr'}
                    tiltClass={'t-tnr'}
                    profileName={'ja-odur'}
                    src={'https://i.pravatar.cc/150?img=3'}
                />
                <PokerAvatar
                    className={'t-avatar av-frt'}
                    tiltClass={'t-frt'}
                    profileName={'ja-odur'}
                    src={'https://i.pravatar.cc/150?img=3'}
                />
                <PokerAvatar className={'t-avatar av-flb'} tiltClass={'t-flb'} profileName={'ja-odur'} src={''} />
            </div>
            <PokerController />
        </div>
    );
}

export { PokerTable };
