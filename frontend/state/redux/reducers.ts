import { AppState } from './types';
import combineReducers from './utils/combineReducers';

const rootReducer = combineReducers<AppState>({});

export { rootReducer as default };
