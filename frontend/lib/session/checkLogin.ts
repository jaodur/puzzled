import { CHECK_LOGIN_MUTATION } from '../../graphql/mutations/authentication';
import { graphqlMutate } from '../api/graphqlHttp';

interface LoginInfoInterface {
    loggedIn: boolean;
    user?: {
        name: string;
        preferredName: string;
        email: string;
        telephone?: string;
        pictureUrl?: string;
        timezone?: string;
    };
}

class CheckLogin {
    public _loginInfo: LoginInfoInterface;

    constructor() {
        this._loginInfo = { loggedIn: false, user: null };
    }

    public clear() {
        this._loginInfo = { loggedIn: false, user: null };
    }

    public async updateLoginInfo() {
        const data = await graphqlMutate(CHECK_LOGIN_MUTATION).then(data => data.checkLogin);
        this._loginInfo = data;
        return data;
    }

    public async setLoginInfo(newLoginInfo: LoginInfoInterface) {
        this._loginInfo = newLoginInfo;
    }

    public async getLoginInfo() {
        return this._loginInfo;
    }
}

function asyncUpdateLoginInfo(checkLoginInstance: CheckLogin) {
    return async (callback: () => any) => {
        await checkLoginInstance.updateLoginInfo();
        callback();
    };
}

function asyncSetLoginInfo(checkLoginInstance: CheckLogin) {
    return async (newLoginInfo: LoginInfoInterface, callback: () => any) => {
        await checkLoginInstance.setLoginInfo(newLoginInfo);
        callback();
    };
}

export default new CheckLogin();
export { asyncUpdateLoginInfo, asyncSetLoginInfo };
