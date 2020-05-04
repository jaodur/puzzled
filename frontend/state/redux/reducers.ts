import { AppState } from './types';
import combineReducers from './utils/combineReducers';

import userProfiles from '../userProfile/reducers';

const rootReducer = combineReducers<AppState>({
    userProfiles,
});

export { rootReducer as default };
