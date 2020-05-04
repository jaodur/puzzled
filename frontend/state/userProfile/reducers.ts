import * as actions from './actions';

const userProfilesReducer = (state: any, action: any) => {
    switch (action.type) {
        case actions.LOAD_USER_PROFILES_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};

export { userProfilesReducer as default };
