import * as React from 'react';

import { FloatType, MessageDialogueInterface, TriPositionType } from '../interfaces/chat';

function MessageDialogue({ children, message, border, round, triPosition, float }: MessageDialogueInterface) {
    let dialogClasses = 'talk-bubble-light tri-right-light';
    let defaultTriPosition: TriPositionType = 'left-top';
    let defaultFloat: FloatType = 'left';

    if (!!float && float === 'right') {
        dialogClasses = 'talk-bubble tri-right';
        defaultTriPosition = 'right-top';
        defaultFloat = 'right';
    }

    dialogClasses = !!border ? `${dialogClasses} border` : dialogClasses;
    dialogClasses = !!round ? `${dialogClasses} round` : dialogClasses;
    dialogClasses = `${dialogClasses} ${triPosition || defaultTriPosition}`;

    return (
        <div className={`msg-wrapper-${float || defaultFloat}`}>
            <div className={dialogClasses}>
                <div className="talktext">
                    <p>{children || message}</p>
                </div>
            </div>
        </div>
    );
}

export { MessageDialogue };
