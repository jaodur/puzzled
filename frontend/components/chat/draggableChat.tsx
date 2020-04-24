import * as React from 'react';

import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import SendIcon from '@material-ui/icons/SendOutlined';
import { animateScroll } from 'react-scroll';

import { CHAT_PLACEHOLDER } from '../../constants/chat';
import { DEFAULT_DRAGGABLE_CHAT_STYLE_CLASS, DEFAULT_DRAGGABLE_HANDLE } from '../../constants/draggable';
import { ChatProfileAvatar } from '../commons/avatar';
import { Draggable } from '../commons/draggable';
import { Flowable } from '../commons/flowable';
import { ChatBodyInterface, ChatInterface, ChatMessageInterface, DraggableChatInterface } from '../interfaces/chat';
import { EventInterface } from '../interfaces/interfaces';
import { MessageDialogue } from './messageDialogue';

const useStyles = makeStyles({
    root: {
        fontSize: '32px',
    },
});

function ChatBody({ styleClass }: ChatBodyInterface) {
    const messageScrollContainerID = 'messageScrollContainerID';
    const defaultMessage: ChatMessageInterface = { float: 'right', content: '' };
    const [messages, setMessages] = React.useState([]);
    const [message, setMessage] = React.useState(defaultMessage);

    // componentDidMount
    React.useEffect(() => {
        scrollToBottom();
    }, []);

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        animateScroll.scrollToBottom({
            containerId: messageScrollContainerID,
        });
    };

    const sendMessage = () => {
        if (message.content) {
            setMessages([...messages, message]);
            setMessage({ ...message, content: '' });
        }
    };

    function onMessageChange(event: EventInterface) {
        event.preventDefault();
        const msg: ChatMessageInterface = { ...message, content: event.target.value };
        setMessage(msg);
    }

    function onMessageSendClick(event: EventInterface) {
        event.preventDefault();
        sendMessage();
    }

    return (
        <div className={styleClass}>
            <div style={{ display: 'flex' }}>
                <Flowable>
                    <ChatProfileAvatar profileName={'Odur Joseph'} small maxLetters={2} />
                    <ChatProfileAvatar
                        src={'https://source.unsplash.com/random'}
                        profileName={'Ocaa jacob'}
                        small
                        maxLetters={2}
                    />
                    <ChatProfileAvatar
                        src={'https://unsplash.com/photos/5E5N49RWtbA'}
                        profileName={'Fred Yiga'}
                        small
                        maxLetters={2}
                    />
                    <ChatProfileAvatar
                        src={'https://source.unsplash.com/random'}
                        profileName={'Okello Josh'}
                        small
                        maxLetters={2}
                    />
                    <ChatProfileAvatar
                        src={'https://source.unsplash.com/random'}
                        profileName={'Okello Josh'}
                        small
                        maxLetters={2}
                    />
                    <ChatProfileAvatar
                        src={'https://source.unsplash.com/random'}
                        profileName={'Okello Josh'}
                        small
                        maxLetters={2}
                    />
                    <ChatProfileAvatar
                        src={'https://source.unsplash.com/random'}
                        profileName={'Okello Josh'}
                        small
                        maxLetters={2}
                    />
                </Flowable>
            </div>
            <div>
                <Flowable scrollContainerId={messageScrollContainerID}>
                    <MessageDialogue round>
                        This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top
                        to specify the location test.
                    </MessageDialogue>
                    <MessageDialogue round>
                        This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top
                        to specify the location test.
                    </MessageDialogue>
                    <MessageDialogue round float={'right'}>
                        This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top
                        to specify the location test.
                    </MessageDialogue>
                    <MessageDialogue round>Lol</MessageDialogue>

                    <MessageDialogue round>
                        This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top
                        to specify the location test.
                    </MessageDialogue>
                    <MessageDialogue round>
                        This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top
                        to specify the location test.
                    </MessageDialogue>
                    <MessageDialogue round>
                        This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top
                        to specify the location test.
                    </MessageDialogue>
                    <MessageDialogue round>L</MessageDialogue>

                    <MessageDialogue round>
                        This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top
                        to specify the location test.
                    </MessageDialogue>
                    <MessageDialogue round>
                        This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top
                        to specify the location test.
                    </MessageDialogue>
                    <MessageDialogue round>
                        This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top
                        to specify the location test.
                    </MessageDialogue>
                    <MessageDialogue round>Lol</MessageDialogue>

                    <MessageDialogue round>T</MessageDialogue>
                    <MessageDialogue round float={'right'}>
                        This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top
                        to specify the location test.
                    </MessageDialogue>
                    <MessageDialogue round float={'right'}>
                        This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top
                        to specify the location test.
                    </MessageDialogue>
                    <MessageDialogue round float={'right'}>
                        t
                    </MessageDialogue>
                    {messages.map((msg: ChatMessageInterface, key) => (
                        <MessageDialogue round float={msg.float} key={key}>
                            {msg.content}
                        </MessageDialogue>
                    ))}
                </Flowable>
                <div className={`${styleClass}__message-send`}>
                    <Input
                        value={message.content}
                        autoFocus
                        multiline
                        disableUnderline
                        placeholder={CHAT_PLACEHOLDER}
                        onChange={onMessageChange}
                    />
                    <SendIcon onClick={onMessageSendClick} />
                </div>
            </div>
        </div>
    );
}

function Chat({ styleClass }: ChatInterface) {
    const classes = useStyles({});
    return (
        <div className={styleClass || DEFAULT_DRAGGABLE_CHAT_STYLE_CLASS}>
            <div className={DEFAULT_DRAGGABLE_HANDLE.CLASSNAME}>
                <span>
                    <ChatIcon className={classes.root} />
                    <span>chat</span>
                    <CloseIcon className={classes.root} />
                </span>
            </div>
            <ChatBody styleClass={`${DEFAULT_DRAGGABLE_CHAT_STYLE_CLASS}__chat_body`} />
        </div>
    );
}

function DraggableChat({  }: DraggableChatInterface) {
    const defaultPosition = { x: 500, y: 150 };
    return (
        <Draggable defaultPosition={defaultPosition}>
            <Chat />
        </Draggable>
    );
}

export { Chat, DraggableChat };
