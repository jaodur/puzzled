import { useSnackbar, withSnackbar } from 'notistack';
import { useState } from 'react';
import * as React from 'react';
import { useMutation } from 'react-apollo-hooks';
import { Redirect, Route, Switch } from 'react-router-dom';
import { validate } from 'validate.js';
import { CREATE_USER_MUTATION, LOGIN_USER_MUTATION } from '../../graphql/mutations/authentication';
import { deepCopy, renderElement } from '../../utils/utils';
import { CustomContentWrapper } from '../commons/customSnackbar';
import { Footer } from '../commons/footer';
import { links } from '../commons/linkUrls';
import { NavBarContainer } from '../commons/navbarContainer';
import { closeAction } from '../commons/snackBarActions';
import { EventInterface } from '../interfaces/interfaces';
import { createUserConstraints, userLogInConstraints } from '../validators/authentication';
import SignIn from './signin';
import SignUp from './signup';

const footerClass: string = 'main-footer';

function SignInSignUpContainer() {
    const preventDefault = (event: any) => event.preventDefault();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    // eslint-disable-next-line
    const [logInUserFunction, setLogInUserFunction] = useMutation(LOGIN_USER_MUTATION);
    // eslint-disable-next-line
    const [createUserFunction, setCreateUserFunction] = useMutation(CREATE_USER_MUTATION);
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

    function renderSnackbar(color: string) {
        return function customSnackbar(key: any, message: string) {
            return <CustomContentWrapper key={key} message={message} color={color} />;
        };
    }

    function validateUserInputs(userInputs: object, constraints: object, fullMessages: boolean = false) {
        return validate(userInputs, constraints, { fullMessages });
    }

    function onTextFieldChange(constraints: object) {
        return function(key: string) {
            return function(event: EventInterface) {
                preventDefault(event);

                const updatedUserInfo = deepCopy(userInfo);
                updatedUserInfo[key] = event.target.value;
                const errors = validateUserInputs(updatedUserInfo, constraints);
                setUserErrors(errors || {});
                setUserInfo(updatedUserInfo);
            };
        };
    }

    async function logInUser(event: EventInterface) {
        preventDefault(event);

        const errors = validateUserInputs(userInfo, userLogInConstraints);

        if (!!errors) {
            setUserErrors(errors || {});
            return;
        }

        await logInUserFunction({
            variables: {
                email: userInfo.email,
                password: userInfo.password,
            },
        })
            .then(() => {
                enqueueSnackbar('successful', {
                    variant: 'success',
                    content: renderSnackbar('success'),
                });
            })
            .catch((response: any) => {
                enqueueSnackbar(response.graphQLErrors[0].message, {
                    variant: 'error',
                    persist: true,
                    content: renderSnackbar('secondary'),
                });
            });
    }

    async function createUser(event: EventInterface) {
        preventDefault(event);

        const errors = validateUserInputs(userInfo, createUserConstraints);

        if (!!errors) {
            setUserErrors(errors || {});
            return;
        }

        await createUserFunction({
            variables: {
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
                password: userInfo.password,
            },
        })
            .then(() => {
                enqueueSnackbar('successful user signup', {
                    variant: 'success',
                    content: renderSnackbar('success'),
                });
            })
            .catch((response: any) => {
                enqueueSnackbar(response.graphQLErrors[0].message, {
                    variant: 'error',
                    persist: true,
                    action: closeAction(closeSnackbar),
                    content: renderSnackbar('secondary'),
                });
            });
    }

    return (
        <React.Fragment>
            <NavBarContainer styleClass={'default-navbar-container'} />
            <div className={'default-nav-strip'} />
            <div className={'content'}>
                <Switch>
                    <Route
                        exact
                        path={links.USER.SIGN_IN}
                        render={renderElement(
                            <SignIn
                                loginUser={logInUser}
                                userInfo={userInfo}
                                onTextFieldChange={onTextFieldChange(userLogInConstraints)}
                                userErrors={userErrors}
                            />
                        )}
                    />
                    <Route
                        exact
                        path={links.USER.SIGN_UP}
                        render={renderElement(
                            <SignUp
                                createUser={createUser}
                                userInfo={userInfo}
                                onTextFieldChange={onTextFieldChange(createUserConstraints)}
                                userErrors={userErrors}
                            />
                        )}
                    />
                    <Redirect to={links.USER.SIGN_IN} />
                </Switch>
            </div>
            <Footer footerClass={footerClass} key={'sudoku-footer'} />
        </React.Fragment>
    );
}

export default withSnackbar(SignInSignUpContainer);
