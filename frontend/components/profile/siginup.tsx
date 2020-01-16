import * as React from 'react';
import {useState} from "react";
import { useSnackbar, withSnackbar } from "notistack";
import { useMutation } from "react-apollo-hooks";
import { Footer } from '../commons/footer';
import { NavBarContainer } from '../commons/navbarContainer';
import SignIn from "./signin";
import { LOGIN_USER_MUTATION } from "../../graphql/mutations/authentication";
import { EventInterface } from "../interfaces/interfaces";
import { closeAction } from "../commons/snackBarActions";
import {deepCopy} from "../../utils/utils";
import {userLogInConstraints } from "../validators/authentication";
import { validate } from "validate.js";

const footerClass: string = 'main-footer';

function SignUp() {
    const preventDefault = (event: any) => event.preventDefault();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [logInUserFunction, setLogInUserFunction] = useMutation(LOGIN_USER_MUTATION);
    const [userInfo, setUserInfo] = useState(userInfoInitialState);
    const [userErrors, setUserErrors] = useState({})

    function userInfoInitialState() {
        return {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            pictureUrl: '',
            preferredName: '',
            telephone: '',
        }
    }

    function onTextFieldChange(key: string){

        return function(event: EventInterface) {
            preventDefault(event);

            const updatedUserInfo = deepCopy(userInfo)
            updatedUserInfo[key] = event.target.value
            const errors = validate(updatedUserInfo, userLogInConstraints, {fullMessages: false})
            setUserErrors(errors || {})
            setUserInfo(updatedUserInfo)
        }
    }

    async function logInUser(event: EventInterface) {
        preventDefault(event);

        await logInUserFunction({
            variables: {
                email: userInfo.email,
                password: userInfo.password,
            },
        }).then((response: any) => {
            enqueueSnackbar('successful', {variant: 'success'})
        }).catch((response: any) => {
            enqueueSnackbar(
                response.graphQLErrors[0].message,
                {variant: 'error', persist: true, action: closeAction(closeSnackbar)}
                )
        });
    }
    return (
        <React.Fragment>
            <NavBarContainer styleClass={'default-navbar-container'} />
            <div className={'default-nav-strip'} />
            <div className={'content'}>
                <SignIn loginUser={logInUser} userInfo={userInfo} onTextFieldChange={onTextFieldChange} userErrors={userErrors}/>
            </div>
            <Footer footerClass={footerClass} key={'sudoku-footer'} />
        </React.Fragment>
    );
}

export default withSnackbar(SignUp);
