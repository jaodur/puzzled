import { CHECK_LOGIN_MUTATION } from '../../graphql/mutations/authentication';
import { graphqlMutate } from '../api/graphqlHttp';

class CheckLogin {
    public _loginInfo: object;

    public async checkLogin() {
        return await graphqlMutate(CHECK_LOGIN_MUTATION);
    }

    public async getLoginInfo() {
        if (!this._loginInfo) {
            const loginInfo = await this.checkLogin();

            if (loginInfo.loggedIn) {
                this._loginInfo = loginInfo;
            }

            return loginInfo;
        }
        return this._loginInfo;
    }
}

export default new CheckLogin();
