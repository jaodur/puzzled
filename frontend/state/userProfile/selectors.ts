import { useSelector } from 'react-redux';

import { AppState } from '../redux/types';

const useLoginInfo = () => {
    return useSelector((state: AppState) => state.currentUser);
};

const useUserProfiles = () => {
    return useSelector((state: AppState) => state.userProfiles);
};

export { useLoginInfo, useUserProfiles };
