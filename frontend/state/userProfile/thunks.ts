import { CHECK_LOGIN_MUTATION } from '../../graphql/mutations/authentication';
import { PROFILES_SEARCH_QUERY } from '../../graphql/queries/profile';
import { graphqlMutate, graphqlQuery } from '../../lib/api/graphqlHttp';
import { getAppStateInterface } from '../redux/types';
import { AppThunkDispatch } from '../redux/types';
import {
    loadCurrentUserFailure,
    loadCurrentUserSuccess,
    loadUserProfilesFailure,
    loadUserProfilesSuccess,
} from './actions';

const loadProfiles = (forceRefresh: boolean = false) => {
    return async (dispatch: AppThunkDispatch, getState: getAppStateInterface) => {
        const userProfiles = getState().userProfiles;

        if (!forceRefresh && !!userProfiles && userProfiles.length > 0) {
            dispatch(loadUserProfilesSuccess(userProfiles));
            return;
        }
        await graphqlQuery(PROFILES_SEARCH_QUERY)
            .then(data => {
                dispatch(loadUserProfilesSuccess(data.profiles));
            })
            .catch(err => {
                dispatch(loadUserProfilesFailure);
            });
    };
};

const loadCurrentUser = () => {
    return async (dispatch: AppThunkDispatch) => {
        await graphqlMutate(CHECK_LOGIN_MUTATION)
            .then(({ checkLogin }) => {
                dispatch(loadCurrentUserSuccess(checkLogin));
            })
            .catch(err => {
                dispatch(loadCurrentUserFailure);
            });
    };
};

export { loadCurrentUser, loadProfiles };
