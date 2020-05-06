import { loadProfiles } from '../userProfile';

const initialStoreDispatch = (dispatch: any) => {
    dispatch(loadProfiles());
};

export { initialStoreDispatch as default };
