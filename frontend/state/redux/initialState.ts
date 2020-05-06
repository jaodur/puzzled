import { AppState } from './types';

const initialState: AppState = {
    userProfiles: [],
    chat: {
        identifier: {},
        channels: {},
        messages: {},
    },
};

export { initialState as default };
