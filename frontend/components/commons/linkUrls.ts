const sudokuLinks = {
    HOME: '/sudoku/',
    PLAY: '/sudoku/play',
    SOLVE: '/sudoku/solve',
    TRAINER: '/sudoku/trainer/',
};

const profileLinks = {
    HOME: '/profile/',
    ACCOUNT_OVERVIEW: '/profile/account-overview',
    EDIT_PROFILE: '/profile/edit-profile',
    CHANGE_PASSWORD: '/profile/change-password',
    NOTIFICATIONS: '/profile/notifications',
};

const userLinks = {
    HOME: '/u/',
    SIGN_IN: '/u/signin',
    SIGN_UP: '/u/signup',
    PROFILE: profileLinks,
};

const links = {
    HOME: '/',
    SUDOKU: sudokuLinks,
    USER: userLinks,
};

export { links };
