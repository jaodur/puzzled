import { ThunkDispatch } from 'redux-thunk';

import { PROFILES_SEARCH_QUERY } from '../../graphql/queries/profile';
import { graphqlQuery } from '../../lib/api/graphqlHttp';
import { getAppStateInterface } from '../redux/types';
import { loadUserProfilesFailure, loadUserProfilesSuccess } from './actions';

const loadProfiles = (forceRefresh: boolean = false) => {
    return async (dispatch: ThunkDispatch<any, any, any>, getState: getAppStateInterface) => {
        const userProfiles = getState().userProfiles;

        if (!forceRefresh && !!userProfiles && userProfiles.length > 0) {
            dispatch(loadUserProfilesSuccess(userProfiles));
            return;
        }
        await graphqlQuery(PROFILES_SEARCH_QUERY, {}, { fetchPolicy: 'no-cache' })
            .then(data => {
                dispatch(loadUserProfilesSuccess(data.profiles));
            })
            .catch(err => {
                dispatch(loadUserProfilesFailure);
            });
    };
};

export { loadProfiles };
