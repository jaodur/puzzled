import { DraggableCoreInterface } from './draggable';

interface ChatInterface {
    styleClass?: string;
}

interface DraggableChatInterface extends ChatInterface, DraggableCoreInterface {}

export { ChatInterface, DraggableChatInterface };
