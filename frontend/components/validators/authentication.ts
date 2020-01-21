import { emailFormat, nameFormat } from './common';

const userLogInConstraints = {
    email: {
        presence: true,
        format: emailFormat,
    },
    password: {
        presence: true,
        length: {
            minimum: 6,
            message: 'Must be at least 6 characters.',
        },
    },
};

const createUserConstraints = {
    ...userLogInConstraints,
    firstName: {
        presence: true,
        format: nameFormat,
    },
    lastName: {
        presence: true,
        format: nameFormat,
    },
};

export { createUserConstraints, userLogInConstraints };
