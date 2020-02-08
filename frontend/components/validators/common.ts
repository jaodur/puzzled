const emailFormat = {
    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Please provide a valid email address.',
};

const nameFormat = {
    pattern: /^[ a-zA-Z\-_]+$/,
    message: 'Must contain english letters, -, _ and space.',
};

const numberFormat = {
    pattern: /^[ 0-9]+$/,
    message: 'Must contain english letters, -, _ and space.',
};

const urlFormat = {
    pattern: /^(ftp|http|https):\/\/[^ "]+$/,
    message: 'Must contain english letters, -, _ and space.',
};

export { emailFormat, nameFormat, numberFormat, urlFormat };
