import { ProfileInterface } from '../../components/interfaces/profile';
import { createReducer } from '../redux/utils';
import * as actions from './actions';
import { UserProfilesAction } from './types';

const userProfilesReducer = createReducer<ProfileInterface[], UserProfilesAction>(() => [], {
    [actions.LOAD_USER_PROFILES_SUCCESS]: (draftState, { payload: userProfiles }) => {
        draftState = userProfiles;
        return draftState;
    },
});

export { userProfilesReducer as default };
