import { chatInitialState } from '../chat';
import { AppState } from './types';

const initialState: AppState = {
    userProfiles: [],
    chat: chatInitialState,
};

export { initialState as default };
