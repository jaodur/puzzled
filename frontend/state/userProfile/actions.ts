import { createAction } from 'typesafe-actions';

import { ProfileInterface } from '../../components/interfaces/profile';
import { CurrentUserInterface } from '../redux/types';

export const LOAD_USER_PROFILES_REQUEST = 'user/userProfiles/LOAD_USER_PROFILE_REQUEST';
export const loadUserProfileRequest = createAction(LOAD_USER_PROFILES_REQUEST)();

export const LOAD_USER_PROFILES_SUCCESS = 'user/userProfiles/LOAD_USER_PROFILE_SUCCESS';
export const loadUserProfilesSuccess = createAction(LOAD_USER_PROFILES_SUCCESS)<ProfileInterface[]>();

export const LOAD_USER_PROFILES_FAILURE = 'user/userProfiles/LOAD_USER_PROFILE_FAILURE';
export const loadUserProfilesFailure = createAction(LOAD_USER_PROFILES_FAILURE)();

export const LOAD_CURRENT_USER_SUCCESS = 'user/currentUser/LOAD_CURRENT_USER_SUCCESS';
export const loadCurrentUserSuccess = createAction(LOAD_CURRENT_USER_SUCCESS)<CurrentUserInterface>();

export const LOAD_CURRENT_USER_FAILURE = 'user/currentUser/LOAD_CURRENT_USER_FAILURE';
export const loadCurrentUserFailure = createAction(LOAD_CURRENT_USER_FAILURE)();
