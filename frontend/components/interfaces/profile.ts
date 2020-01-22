interface UserInfoInterface {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    pictureUrl: string;
    preferredName: string;
    telephone: string;
}

interface UserErrorsInterface {
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    pictureUrl?: string;
    preferredName?: string;
    telephone?: string;
}

interface SignCommonsInterface {
    onTextFieldChange: (key: string) => any;
    userInfo?: UserInfoInterface;
    userErrors: UserErrorsInterface;
}

interface SignInInterface extends SignCommonsInterface {
    loginUser: (event: any) => any;
}

interface SIgnUpInterface extends SignCommonsInterface {
    createUser: (event: any) => any;
}

export { SignInInterface, SIgnUpInterface, UserErrorsInterface, UserInfoInterface };
