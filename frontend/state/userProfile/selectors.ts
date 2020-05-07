import { useSelector } from 'react-redux';
import { AppState } from '../redux/types';

const useloginInfo = () => {
    return useSelector((state: AppState) => state.currentUser);
};

export { useloginInfo };
