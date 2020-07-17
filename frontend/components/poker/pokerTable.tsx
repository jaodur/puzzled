import * as React from 'react';

import { Card } from '../icons/cards';
import { PokerAvatar } from './pokerAvatar';

function PokerTable() {
    return (
        <>
            <div className={'poker-table'}>
                <div className={'p-table-content'}>
                    <Card value={'TH'} />
                    <Card value={'JH'} />
                    <Card value={'QH'} />
                    <Card value={'KH'} />
                    <Card value={'AH'} />
                </div>
                <PokerAvatar
                    className={'t-avatar av-bnl'}
                    tiltClass={'t-bnl'}
                    profileName={'ja-odur'}
                    src={'https://i.pravatar.cc/150?img=3'}
                />
                <PokerAvatar
                    className={'t-avatar av-bt'}
                    tiltClass={'t-bt'}
                    profileName={'ja-odur'}
                    src={'https://i.pravatar.cc/150?img=3'}
                />
                <PokerAvatar
                    className={'t-avatar av-bnr'}
                    tiltClass={'t-bnr'}
                    profileName={'ja-odur'}
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
        </>
    );
}

export { PokerTable };
