import { AppState } from './types';
import combineReducers from './utils/combineReducers';

import chat from '../chat/reducers';
import userProfiles from '../userProfile/reducers';

const rootReducer = combineReducers<AppState>({
    userProfiles,
    chat,
});

export { rootReducer as default };
