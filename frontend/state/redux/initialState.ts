import { chatInitialState } from '../chat';
import { AppState } from './types';

const initialState: AppState = {
    currentUser: { loggedIn: false, user: null },
    userProfiles: [],
    chat: chatInitialState,
};

export { initialState as default };
