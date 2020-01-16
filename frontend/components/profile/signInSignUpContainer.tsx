import { useSnackbar, withSnackbar } from 'notistack';
import * as React from 'react';
import { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { validate } from 'validate.js';
import { LOGIN_USER_MUTATION } from '../../graphql/mutations/authentication';
import { deepCopy } from '../../utils/utils';
import { Footer } from '../commons/footer';
import { NavBarContainer } from '../commons/navbarContainer';
import { closeAction } from '../commons/snackBarActions';
import { EventInterface } from '../interfaces/interfaces';
import { userLogInConstraints } from '../validators/authentication';
import SignIn from './signin';

const footerClass: string = 'main-footer';

function SignInSignUpContainer() {
    const preventDefault = (event: any) => event.preventDefault();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    // eslint-disable-next-line
    const [logInUserFunction, setLogInUserFunction] = useMutation(LOGIN_USER_MUTATION);
    const [userInfo, setUserInfo] = useState(userInfoInitialState);
    const [userErrors, setUserErrors] = useState({});

    function userInfoInitialState() {
        return {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            pictureUrl: '',
            preferredName: '',
            telephone: '',
        };
    }

    function validateUserInputs(userInputs: object, constraints: object, fullMessages: boolean = false) {
        return validate(userInputs, constraints, { fullMessages });
    }

    function onTextFieldChange(key: string) {
        return function(event: EventInterface) {
            preventDefault(event);

            const updatedUserInfo = deepCopy(userInfo);
            updatedUserInfo[key] = event.target.value;
            const errors = validateUserInputs(updatedUserInfo, userLogInConstraints);
            setUserErrors(errors || {});
            setUserInfo(updatedUserInfo);
        };
    }

    async function logInUser(event: EventInterface) {
        preventDefault(event);

        const errors = validateUserInputs(userInfo, userLogInConstraints);

        if (!!errors) {
            setUserErrors(errors);
            return;
        }

        await logInUserFunction({
            variables: {
                email: userInfo.email,
                password: userInfo.password,
            },
        })
            .then(() => {
                enqueueSnackbar('successful', { variant: 'success' });
            })
            .catch((response: any) => {
                enqueueSnackbar(response.graphQLErrors[0].message, {
                    variant: 'error',
                    persist: true,
                    action: closeAction(closeSnackbar),
                });
            });
    }
    return (
        <React.Fragment>
            <NavBarContainer styleClass={'default-navbar-container'} />
            <div className={'default-nav-strip'} />
            <div className={'content'}>
                <SignIn
                    loginUser={logInUser}
                    userInfo={userInfo}
                    onTextFieldChange={onTextFieldChange}
                    userErrors={userErrors}
                />
            </div>
            <Footer footerClass={footerClass} key={'sudoku-footer'} />
        </React.Fragment>
    );
}

export default withSnackbar(SignInSignUpContainer);
