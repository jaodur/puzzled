import { validate } from 'validate.js';

function validateUserInputs(userInputs: object, constraints: object, fullMessages: boolean = false) {
    return validate(userInputs, constraints, { fullMessages });
}

export { validateUserInputs };
