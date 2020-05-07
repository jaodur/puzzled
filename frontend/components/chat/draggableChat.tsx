import * as React from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/CloseOutlined';

import { DEFAULT_DRAGGABLE_CHAT_STYLE_CLASS, DEFAULT_DRAGGABLE_HANDLE } from '../../constants/draggable';
import { useIsMiniChatOpen } from '../../state/chat';
import { setMiniChatOpen } from '../../state/chat/thunks';
import { Draggable } from '../commons/draggable';
import { IsLoggedIn } from '../commons/loggedIn';
import { ChatInterface, DraggableChatInterface } from '../interfaces/chat';
import { EventInterface } from '../interfaces/interfaces';
import { ChatBody } from './chatBody';
import { ChatIcon } from './icons';

const useStyles = makeStyles({
    root: {
        fontSize: '32px',
        '&:hover': {
            borderRadius: '30px',
            backgroundColor: 'red',
            cursor: 'pointer',
            transition: 'background 0.5s',
        },
    },
});

function Chat({ styleClass }: ChatInterface) {
    const classes = useStyles({});
    const dispatch = useDispatch();

    const onCloseIconClick = (event: EventInterface) => {
        event.preventDefault();
        dispatch(setMiniChatOpen(false));
    };

    return (
        <div className={styleClass || DEFAULT_DRAGGABLE_CHAT_STYLE_CLASS}>
            <div className={DEFAULT_DRAGGABLE_HANDLE.CLASSNAME}>
                <span>
                    <ChatIcon />
                    <span>chat</span>
                    <CloseIcon className={classes.root} onClick={onCloseIconClick} />
                </span>
            </div>
            <ChatBody styleClass={`${DEFAULT_DRAGGABLE_CHAT_STYLE_CLASS}__chat_body`} />
        </div>
    );
}

function DraggableChat({  }: DraggableChatInterface) {
    const defaultPosition = { x: 500, y: 150 };
    const isMiniChatOpen = useIsMiniChatOpen();
    return (
        <IsLoggedIn>
            <Draggable show={isMiniChatOpen} defaultPosition={defaultPosition}>
                <Chat />
            </Draggable>
        </IsLoggedIn>
    );
}

export { Chat, DraggableChat };
