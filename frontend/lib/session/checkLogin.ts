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

    public async checkLogin() {
        return await graphqlMutate(CHECK_LOGIN_MUTATION);
    }

    public async setLoginInfo(newLoginInfo: LoginInfoInterface) {
        this._loginInfo = newLoginInfo;
    }

    public async getLoginInfo() {
        if (!this._loginInfo) {
            this._loginInfo = await this.checkLogin().then(data => data.checkLogin);
        }
        return this._loginInfo;
    }
}

const checkLoginInstance = new CheckLogin();

checkLoginInstance.getLoginInfo();

export default checkLoginInstance;
