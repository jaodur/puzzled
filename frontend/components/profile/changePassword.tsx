import * as React from 'react';
import { useHistory } from 'react-router';

import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-apollo-hooks';

import { CHANGE_PASSWORD_MUTATION } from '../../graphql/mutations/authentication';
import { renderSnackbar } from '../../utils/customSnackbar';
import { checkEmpty, deepCopy, isCleanForm } from '../../utils/utils';
import { validateUserInputs } from '../../utils/validation';
import { Button } from '../commons/button';
import { StackedInput } from '../commons/inputs';
import { links } from '../commons/linkUrls';
import { useCheckLoginContext } from '../commons/puzzleContext';
import { EventInterface } from '../interfaces/interfaces';
import { ChangePasswordInterface } from '../interfaces/profile';
import { changePasswordConstraints } from '../validators/authentication';

function ChangePassword({ styleClass, themeStyleClass }: ChangePasswordInterface) {
    const preventDefault = (event: any) => event.preventDefault();
    const history = useHistory();
    const [password, setPassword] = React.useState(changePasswordInitState());
    const [passwordErrors, setPasswordErrors] = React.useState(changePasswordInitState());
    // eslint-disable-next-line
    const [changePasswordFunc, setChangePasswordFunc] = useMutation(CHANGE_PASSWORD_MUTATION);
    const { asyncUpdateLoginInfo } = useCheckLoginContext();
    const { enqueueSnackbar } = useSnackbar();

    function changePasswordInitState() {
        return {
            password: '',
            newPassword: '',
            confirmPassword: '',
        };
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

    async function changePassword(event: EventInterface) {
        preventDefault(event);

        const errors = validateUserInputs(password, changePasswordConstraints);

        if (!!errors) {
            setPasswordErrors(errors || {});
            return;
        }

        await changePasswordFunc({ variables: password })
            .then(async () => {
                await asyncUpdateLoginInfo(() => {});
                enqueueSnackbar('Password changed successfully. Please re-login', {
                    variant: 'success',
                    content: renderSnackbar('success'),
                });
                history.push(links.USER.SIGN_IN);
            })
            .catch((response: any) => {
                enqueueSnackbar(response.graphQLErrors[0].message, {
                    variant: 'error',
                    persist: true,
                    content: renderSnackbar('secondary'),
                });
            });
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
                        value={password.password}
                        type={'password'}
                        onChange={onPasswordFieldChange('password')}
                    />
                    <StackedInput
                        label={'New Password'}
                        value={password.newPassword}
                        type={'password'}
                        onChange={onPasswordFieldChange('newPassword')}
                        errorMsg={checkEmpty(passwordErrors.newPassword)}
                    />
                    <StackedInput
                        label={'Confirm Password'}
                        value={password.confirmPassword}
                        type={'password'}
                        onChange={onPasswordFieldChange('confirmPassword')}
                        errorMsg={checkEmpty(passwordErrors.confirmPassword)}
                    />
                </div>
                <div className={`${styleClass}__align_right`}>
                    <Button label={'cancel'} styleClass={'cancel-btn'} />
                    <Button
                        label={'set new password'}
                        styleClass={'save-btn'}
                        onBtnClick={changePassword}
                        disabled={isCleanForm(changePasswordInitState(), password)}
                    />
                </div>
            </div>
        </div>
    );
}

export { ChangePassword };
