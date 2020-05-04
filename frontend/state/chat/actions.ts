import { createAction } from 'typesafe-actions';

export const LOAD_USER_PROFILE_REQUEST = 'chat/userProfiles/LOAD_USER_PROFILE_REQUEST';
export const LOAD_USER_PROFILE_SUCCESS = 'chat/userProfiles/LOAD_USER_PROFILE_SUCCESS';
export const LOAD_USER_PROFILE_FAILURE = 'chat/userProfiles/LOAD_USER_PROFILE_FAILURE';
export const loadUserProfileRequest = createAction(LOAD_USER_PROFILE_REQUEST)();
