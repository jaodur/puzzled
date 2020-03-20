import * as React from 'react';

import { Draggable } from '../commons/draggable';
import { ChatInterface, DraggableChatInterface } from '../interfaces/chat';

const defaultChatStyleClass = 'default-draggable-chat';

function Chat({ styleClass }: ChatInterface) {
    return <div className={styleClass || defaultChatStyleClass}>This is a test component</div>;
}

function DraggableChat({  }: DraggableChatInterface) {
    return <Draggable render={() => <Chat />} scale={1} />;
}

export { Chat, DraggableChat };
