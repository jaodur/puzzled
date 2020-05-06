import { DraggableCoreInterface } from './draggable';
import { ProfileInterface } from './profile';

type FloatType = 'left' | 'right';

type TriPositionType =
    | 'left-top'
    | 'left-in'
    | 'btm-left'
    | 'btm-left-in'
    | 'btm-right-in'
    | 'btm-right'
    | 'right-in'
    | 'right-top';
interface ChatInterface {
    styleClass?: string;
}

interface DraggableChatInterface extends ChatInterface, DraggableCoreInterface {}

interface ChatBodyInterface extends ChatInterface {}

interface MessageDialogueInterface {
    children?: string;
    message?: string;
    border?: boolean;
    round?: boolean;
    triPosition?: TriPositionType;
    float?: FloatType;
}

interface ChatMessageInterface {
    float: FloatType;
    message: string;
    user?: ProfileInterface;
}

interface ChatChannelInterface {
    id: string;
    roomId: string;
    name: string;
    users: ProfileInterface[];
    messages: ChatMessageInterface[];
}

interface ChatIconInterface {
    size?: string;
}

export {
    ChatBodyInterface,
    ChatChannelInterface,
    ChatInterface,
    ChatIconInterface,
    ChatMessageInterface,
    DraggableChatInterface,
    MessageDialogueInterface,
    TriPositionType,
    FloatType,
};
