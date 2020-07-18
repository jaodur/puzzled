import * as React from 'react';

import { Button } from '@material-ui/core';
import { Card, Tilt } from '../icons/cards';

function PokerController() {
    return (
        <div className={'p-game-controller'}>
            <div>
                <Button>Raise</Button>
            </div>
            <div>
                <Button color={'secondary'}>Fold</Button>
                <Button color={'secondary'}>Leave Room</Button>
            </div>
            <Tilt className={'sliding-card-tilt'}>
                <Card value={'AH'} size={'large'} />
                <Card value={'KH'} size={'large'} />
            </Tilt>
            <div>
                <Button color={'primary'}>Call/Check</Button>
            </div>
        </div>
    );
}

export { PokerController };
