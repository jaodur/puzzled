import * as React from 'react';

import Typography from '@material-ui/core/Typography';

import { validate } from 'validate.js';
import { deepCopy } from '../../utils/utils';
import { Button } from '../commons/button';
import { StackedInput } from '../commons/inputs';
import { EventInterface } from '../interfaces/interfaces';
import { ChangePasswordInterface } from '../interfaces/profile';
import { changePasswordConstraints } from '../validators/authentication';

function ChangePassword({ styleClass, themeStyleClass }: ChangePasswordInterface) {
    const preventDefault = (event: any) => event.preventDefault();
    const [password, setPassword] = React.useState(changePasswordInitState());
    const [passwordErrors, setPasswordErrors] = React.useState(changePasswordInitState());

    function changePasswordInitState() {
        return {
            password: '',
            newPassword: '',
            confirmPassword: '',
        };
    }

    function validateUserInputs(userInputs: object, constraints: object, fullMessages: boolean = false) {
        return validate(userInputs, constraints, { fullMessages });
    }

    function onPasswordFieldChange(key: string) {
        return function(event: EventInterface) {
            preventDefault(event);

            const updatedPasswordInfo = deepCopy(password);
            updatedPasswordInfo[key] = event.target.value;
            let errors = validateUserInputs(updatedPasswordInfo, changePasswordConstraints);

            errors = errors || {};

            if (updatedPasswordInfo.confirmPassword !== updatedPasswordInfo.newPassword) {
                errors = { ...errors, confirmPassword: ["Password doesn't match"] };
            }

            setPasswordErrors(errors);
            setPassword(updatedPasswordInfo);
        };
    }

    function checkEmpty(value: string) {
        return !!value ? value[0] : '';
    }

    return (
        <div>
            <div style={{ backgroundColor: 'white', padding: '5%' }}>
                <Typography gutterBottom variant="h5" component="h2">
                    Change Password
                </Typography>

                <div className={themeStyleClass.root}>
                    <StackedInput
                        label={'Current Password'}
                        defaultValue={''}
                        type={'password'}
                        onChange={onPasswordFieldChange('password')}
                    />
                    <StackedInput
                        label={'New Password'}
                        defaultValue={''}
                        type={'password'}
                        onChange={onPasswordFieldChange('newPassword')}
                        errorMsg={checkEmpty(passwordErrors.newPassword)}
                    />
                    <StackedInput
                        label={'Confirm Password'}
                        defaultValue={''}
                        type={'password'}
                        onChange={onPasswordFieldChange('confirmPassword')}
                        errorMsg={checkEmpty(passwordErrors.confirmPassword)}
                    />
                </div>
                <div className={`${styleClass}__align_right`}>
                    <Button label={'cancel'} styleClass={'cancel-btn'} />
                    <Button label={'set new password'} styleClass={'save-btn'} />
                </div>
            </div>
        </div>
    );
}

export { ChangePassword };
