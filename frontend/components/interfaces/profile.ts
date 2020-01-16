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

interface SignInInterface {
    loginUser: (event: any) => any;
    onTextFieldChange: (key: string) => any;
    userInfo: UserInfoInterface;
    userErrors: UserErrorsInterface;
}

export { SignInInterface, UserErrorsInterface, UserInfoInterface };
