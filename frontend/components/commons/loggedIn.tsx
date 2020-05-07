import * as React from 'react';

import { useloginInfo } from '../../state/userProfile';
import { IsLoggedInInterface } from '../interfaces/isLoggedIn';

const IsLoggedIn = ({ children }: IsLoggedInInterface) => {
    const currentUser = useloginInfo();
    return currentUser.loggedIn ? children : <></>;
};

export { IsLoggedIn };
