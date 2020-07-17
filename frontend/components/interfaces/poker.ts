import { AvatarInterface } from './profile';

interface PokerAvatarInterface extends AvatarInterface {
    dealer?: boolean;
    tiltClass?: string;
}

export { PokerAvatarInterface };
