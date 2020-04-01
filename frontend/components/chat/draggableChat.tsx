import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import CloseIcon from '@material-ui/icons/CloseOutlined';

import { Draggable } from '../commons/draggable';
import { ChatInterface, DraggableChatInterface } from '../interfaces/chat';

const defaultChatStyleClass = 'default-draggable-chat';

const useStyles = makeStyles({
    root: {
        fontSize: '32px',
    },
});

function Chat({ styleClass }: ChatInterface) {
    const classes = useStyles({});
    return (
        <div className={styleClass || defaultChatStyleClass}>
            <div>
                <span>
                    <ChatIcon className={classes.root} />
                    <span>chat</span>
                    <CloseIcon className={classes.root} />
                </span>
            </div>
        </div>
    );
}

function DraggableChat({  }: DraggableChatInterface) {
    return <Draggable render={() => <Chat />} scale={1} />;
}

export { Chat, DraggableChat };
