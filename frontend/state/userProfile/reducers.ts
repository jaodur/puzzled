import { ProfileInterface } from '../../components/interfaces/profile';
import { CurrentUserInterface } from '../redux/types';
import { createReducer } from '../redux/utils';
import * as actions from './actions';
import { UserProfilesAction } from './types';

const userProfilesReducer = createReducer<ProfileInterface[], UserProfilesAction>(() => [], {
    [actions.LOAD_USER_PROFILES_SUCCESS]: (draftState, { payload: userProfiles }) => {
        draftState = userProfiles;
        return draftState;
    },
});

const currentUserReducer = createReducer<CurrentUserInterface, UserProfilesAction>(
    () => ({ loggedIn: false, user: null }),
    {
        [actions.LOAD_CURRENT_USER_SUCCESS]: (draftState, { payload: currentUser }) => {
            draftState = currentUser;
            return draftState;
        },
    }
);

export { userProfilesReducer as default, currentUserReducer };
