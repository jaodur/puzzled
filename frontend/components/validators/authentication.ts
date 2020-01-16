import { emailFormat } from './common';

const userLogInConstraints = {
    email: {
        presence: true,
        format: emailFormat,
    },
    password: {
        presence: true,
        length: {
            minimum: 4,
            message: 'Must be at least 6 characters.',
        },
    },
};

export { userLogInConstraints };
