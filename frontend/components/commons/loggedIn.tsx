import * as React from 'react';

import { useLoginInfo } from '../../state/userProfile';
import { IsLoggedInInterface } from '../interfaces/isLoggedIn';

const IsLoggedIn = ({ children }: IsLoggedInInterface) => {
    const currentUser = useLoginInfo();
    return currentUser.loggedIn ? children : <></>;
};

export { IsLoggedIn };
