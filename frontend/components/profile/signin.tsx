import * as React from "react";
import { Button, TextField, Link } from "@material-ui/core";
import { withSnackbar, useSnackbar } from 'notistack';
import { closeAction } from "../commons/snackBarActions";

const signInStyleClass: string = 'signin-container';



function SignIn() {
    const preventDefault = (event: any) => event.preventDefault();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    return (
        <>
        <div className={signInStyleClass}>
            <p className={`${signInStyleClass}__title`}>sign in</p>
            <div className={`${signInStyleClass}__input_container`}>
                <TextField
                    className={`${signInStyleClass}__input`}
                    label="Email"
                    variant="filled"
                    error
                    helperText={'Please enter a valid email.'}
                />

            </div>
            <div className={`${signInStyleClass}__input_container`}>
                <TextField
                    className={`${signInStyleClass}__input`}
                    label="Password"
                    variant="filled"
                    error
                    helperText={'Your password must contain between 4 and 60 characters.'}
                    type="password"/>
            </div>

            <div className={`${signInStyleClass}__button_container`}>
                <Button className={`${signInStyleClass}__button`} variant="contained" color="primary" onClick={
                    () => enqueueSnackbar('Successfully fetched the data.',
                        {variant: 'error', persist: true, action: closeAction(closeSnackbar)})}>
                    Sign in
                </Button>
            </div>

            <div className={`${signInStyleClass}__link_container`}>
                New to Puzzle? <Link href="#" onClick={preventDefault}>Sign up now</Link>.
            </div>
        </div>

            </>
    );
};

export default withSnackbar(SignIn);
