import { DraggableCoreInterface } from './draggable';

interface ChatInterface {
    styleClass?: string;
}

interface DraggableChatInterface extends ChatInterface, DraggableCoreInterface {}

interface ChatBodyInterface extends ChatInterface {}

export { ChatBodyInterface, ChatInterface, DraggableChatInterface };
