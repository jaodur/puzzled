import { DraggableCoreInterface } from './draggable';

type FloatType = 'left' | 'right';

type TriPosition =
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
    triPosition?: TriPosition;
    float?: FloatType;
}

export { ChatBodyInterface, ChatInterface, DraggableChatInterface, MessageDialogueInterface };
