import * as React from 'react';

import { Button } from '@material-ui/core';

import { PrettoInputSlider } from '../commons/slider';
import { Card, Tilt } from '../icons/cards';

function PokerController() {
    return (
        <div className={'p-game-controller'}>
            <div>
                <PrettoInputSlider value={20} min={-20} max={200} />
                <Button>Raise</Button>
            </div>
            <div className={'p-button-c'}>
                <Button color={'secondary'}>Fold</Button>
                <Button color={'secondary'}>Leave Room</Button>
            </div>
            <Tilt className={'sliding-card-tilt'}>
                <Card value={'AH'} size={'large'} />
                <Card value={'KH'} size={'large'} />
            </Tilt>
            <div className={'p-button-c'}>
                <Button color={'primary'}>Call/Check</Button>
            </div>
        </div>
    );
}

export { PokerController };
