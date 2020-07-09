import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import { useSnackbar, withSnackbar } from 'notistack';
import { useMutation } from 'react-apollo-hooks';
import { useLastLocation } from 'react-router-last-location';

import { CREATE_USER_MUTATION, LOGIN_USER_MUTATION } from '../../graphql/mutations/authentication';
import { loadCurrentUser } from '../../state/userProfile';
import { renderSnackbar } from '../../utils/customSnackbar';
import { deepCopy, renderElement } from '../../utils/utils';
import { validateUserInputs } from '../../utils/validation';
import { Footer } from '../commons/footer';
import { links } from '../commons/linkUrls';
import { NavBarContainer } from '../commons/navbarContainer';
import { useCheckLoginContext } from '../commons/puzzleContext';
import { closeAction } from '../commons/snackBarActions';
import { EventInterface } from '../interfaces/interfaces';
import { createUserConstraints, userLogInConstraints } from '../validators/authentication';
import SignIn from './signin';
import SignUp from './signup';

function SignInSignUpContainer() {
    const preventDefault = (event: any) => event.preventDefault();
    const dispatch = useDispatch();
    const history = useHistory();
    const lastLocation = useLastLocation();
    const { checkLogin, asyncUpdateLoginInfo } = useCheckLoginContext();
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

    function prevLocation() {
        if (
            !!lastLocation &&
            lastLocation.pathname !== links.USER.SIGN_UP &&
            lastLocation.pathname !== links.USER.SIGN_IN
        ) {
            return lastLocation.pathname;
        }

        return links.HOME;
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
            .then(async (response: any) => {
                const preferredName = await response.data.loginUser.user.preferredName;

                await dispatch(loadCurrentUser());
                await asyncUpdateLoginInfo(() => {});

                enqueueSnackbar(`Login successful, welcome ${preferredName}`, {
                    variant: 'success',
                    content: renderSnackbar('success'),
                });

                history.push(await prevLocation());
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
                enqueueSnackbar('Successful signup, please login.', {
                    variant: 'success',
                    content: renderSnackbar('success'),
                });
                history.push(links.USER.SIGN_IN);
            })
            .catch((response: any) => {
                console.log('res', response);
                enqueueSnackbar(response.graphQLErrors[0].message, {
                    variant: 'error',
                    persist: true,
                    action: closeAction(closeSnackbar),
                    content: renderSnackbar('secondary'),
                });
            });
    }

    return checkLogin._loginInfo.loggedIn ? (
        <Redirect to={links.HOME} />
    ) : (
        <React.Fragment>
            <NavBarContainer />
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
            <Footer/>
        </React.Fragment>
    );
}

export default withSnackbar(SignInSignUpContainer);
