const sudokuLinks = {
    HOME: '/sudoku/',
    PLAY: '/sudoku/play',
    SOLVE: '/sudoku/solve',
    TRAINER: '/sudoku/trainer/',
};

const profileLinks = {
    HOME: '/u/profile/',
    ACCOUNT_OVERVIEW: '/u/profile/account-overview',
    EDIT_PROFILE: '/u/profile/edit-profile',
    CHANGE_PASSWORD: '/u/profile/change-password',
    NOTIFICATIONS: '/u/profile/notifications',
};

const userLinks = {
    HOME: '/u/',
    SIGN_IN: '/u/sign-in',
    SIGN_UP: '/u/sign-up',
    PROFILE: profileLinks,
};

const links = {
    HOME: '/',
    SUDOKU: sudokuLinks,
    USER: userLinks,
};

export { links };
