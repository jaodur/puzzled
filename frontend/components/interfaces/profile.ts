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

interface AvatarInterface {
    src?: string;
    profileName: string;
    styleClass: string;
}

interface MaterialThemeInterface {
    root: any;
}

interface AccountOverviewInterface {
    styleClass?: string;
    themeStyleClass: MaterialThemeInterface;
}

interface EditProfileInterface {
    styleClass: string;
    themeStyleClass: MaterialThemeInterface;
}

interface ChangePasswordInterface {
    styleClass: string;
    themeStyleClass: MaterialThemeInterface;
}

export {
    AccountOverviewInterface,
    AvatarInterface,
    ChangePasswordInterface,
    EditProfileInterface,
    SignInInterface,
    SIgnUpInterface,
    UserErrorsInterface,
    UserInfoInterface,
};
