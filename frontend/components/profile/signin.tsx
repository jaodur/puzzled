import { Button, TextField } from '@material-ui/core';
import * as React from 'react';
import { TextLink } from '../commons/links';
import { links } from '../commons/linkUrls';
import { SignInInterface } from '../interfaces/profile';

const signInStyleClass: string = 'signin-container';

function SignIn({ loginUser, onTextFieldChange, userErrors }: SignInInterface) {
    return (
        <>
            <div className={signInStyleClass}>
                <p className={`${signInStyleClass}__title`}>sign in</p>
                <div className={`${signInStyleClass}__input_container`}>
                    <TextField
                        className={`${signInStyleClass}__input`}
                        label="Email"
                        variant="filled"
                        error={!!userErrors.email}
                        helperText={!!userErrors.email ? userErrors.email : ''}
                        onChange={onTextFieldChange('email')}
                    />
                </div>
                <div className={`${signInStyleClass}__input_container`}>
                    <TextField
                        className={`${signInStyleClass}__input`}
                        label="Password"
                        variant="filled"
                        error={!!userErrors.password}
                        helperText={!!userErrors.password ? userErrors.password : ''}
                        type="password"
                        onChange={onTextFieldChange('password')}
                    />
                </div>

                <div className={`${signInStyleClass}__button_container`}>
                    <Button
                        className={`${signInStyleClass}__button`}
                        variant="contained"
                        color="primary"
                        onClick={loginUser}>
                        Sign in
                    </Button>
                </div>

                <div className={`${signInStyleClass}__link_container`}>
                    New to Puzzled?{' '}
                    <TextLink link={links.USER.SIGN_UP} text={'Sign up now'} styleClass={'link__standard'} />
                    &#46;
                </div>
            </div>
        </>
    );
}

export default SignIn;
