import { emailFormat, nameFormat, numberFormat, urlFormat } from './common';

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

const editProfileConstraints = {
    name: {
        presence: true,
        format: nameFormat
    },
    preferredName: {
        presence: true,
        format: nameFormat
    },
     email: {
        presence: true,
        format: emailFormat,
    },
     telephone: {
        presence: false,
         format: numberFormat,
        length: {
            minimum: 10,
            message: 'Must be at least 10 digits',
        },
    },
    timezone: {
        presence: true,
        format: nameFormat
    },
    pictureUrl: {
        presence: true,
        format: urlFormat
    },
}

export { createUserConstraints, editProfileConstraints, userLogInConstraints };
