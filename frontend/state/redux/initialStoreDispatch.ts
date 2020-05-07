import { loadCurrentUser, loadProfiles } from '../userProfile';
import { AppThunkDispatch } from './types';

const initialStoreDispatch = (dispatch: AppThunkDispatch) => {
    dispatch(loadProfiles());
    dispatch(loadCurrentUser());
};

export { initialStoreDispatch as default };
