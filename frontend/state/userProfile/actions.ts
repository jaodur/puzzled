import { createAction } from 'typesafe-actions';

import { ProfileInterface } from '../../components/interfaces/profile';

export const LOAD_USER_PROFILES_REQUEST = 'user/userProfiles/LOAD_USER_PROFILE_REQUEST';
export const loadUserProfileRequest = createAction(LOAD_USER_PROFILES_REQUEST)();

export const LOAD_USER_PROFILES_SUCCESS = 'user/userProfiles/LOAD_USER_PROFILE_SUCCESS';
export const loadUserProfilesSuccess = createAction(LOAD_USER_PROFILES_SUCCESS)<ProfileInterface[]>();

export const LOAD_USER_PROFILES_FAILURE = 'user/userProfiles/LOAD_USER_PROFILE_FAILURE';
export const loadUserProfilesFailure = createAction(LOAD_USER_PROFILES_FAILURE)();
