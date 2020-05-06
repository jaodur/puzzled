import { loadProfiles } from '../userProfile';
import { AppThunkDispatch } from './types';

const initialStoreDispatch = (dispatch: AppThunkDispatch) => {
    dispatch(loadProfiles());
};

export { initialStoreDispatch as default };
