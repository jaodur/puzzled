import * as React from 'react';

import { ChatInterface } from '../interfaces/chat';
import { ChatIcon } from './icons';

function EmptyChat({ styleClass }: ChatInterface) {
    return (
        <div className={styleClass || 'default-empty-chat'}>
            <div>
                <ChatIcon size={'100px'} />
                <div>Start a conversation by typing a message</div>
            </div>
        </div>
    );
}

export { EmptyChat };
