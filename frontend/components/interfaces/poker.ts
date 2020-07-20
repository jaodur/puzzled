import { AvatarInterface } from './profile';

interface PokerAvatarInterface extends AvatarInterface {
    dealer?: boolean;
    tiltClass?: string;
    currentPlayer?: boolean;
}

export { PokerAvatarInterface };
