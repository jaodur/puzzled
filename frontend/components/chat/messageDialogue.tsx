import * as React from 'react';

import { MessageDialogueInterface } from '../interfaces/chat';

function MessageDialogue({ children, message, border, round, triPosition }: MessageDialogueInterface) {
    let dialogClasses = 'talk-bubble tri-right';

    dialogClasses = !!border ? `${dialogClasses} border` : dialogClasses;
    dialogClasses = !!round ? `${dialogClasses} round` : dialogClasses;
    dialogClasses = `${dialogClasses} ${triPosition || ''}`;

    return (
        <div className={dialogClasses}>
            <div className="talktext">
                <p>{children || message}</p>
            </div>
        </div>
    );
}

export { MessageDialogue };
