import { AppState } from './types';
import combineReducers from './utils/combineReducers';

import chat from '../chat/reducers';
import userProfiles, { currentUserReducer as currentUser } from '../userProfile/reducers';

const rootReducer = combineReducers<AppState>({
    currentUser,
    userProfiles,
    chat,
});

export { rootReducer as default };
