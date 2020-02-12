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
    styleClass?: string;
    small?: boolean;
    onClick?: (event: any) => any;
}

interface MaterialThemeInterface {
    root: any;
}

interface ProfileInterface {
    name: string;
    preferredName: string;
    email: string;
    telephone?: string;
    pictureUrl?: string;
    timezone?: string;
}

interface ProfileErrorsInterface {
    name?: string;
    preferredName?: string;
    email?: string;
    telephone?: string;
    pictureUrl?: string;
    timezone?: string;
}

interface AccountOverviewInterface {
    profile: ProfileInterface;
    styleClass?: string;
    themeStyleClass: MaterialThemeInterface;
}

interface EditProfileInterface {
    defaultProfileValues?: ProfileInterface;
    styleClass?: string;
    themeStyleClass?: MaterialThemeInterface;
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
