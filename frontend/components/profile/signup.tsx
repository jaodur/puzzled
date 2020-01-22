import { Button, TextField } from '@material-ui/core';
import * as React from 'react';
import { TextLink } from '../commons/links';
import { links } from '../commons/linkUrls';
import { SIgnUpInterface } from '../interfaces/profile';

const signUpStyleClass: string = 'signup-container';

function SignUp({ createUser, onTextFieldChange, userErrors }: SIgnUpInterface) {
    return (
        <>
            <div className={signUpStyleClass}>
                <p className={`${signUpStyleClass}__title`}>sign up</p>
                <div className={`${signUpStyleClass}__input_container`}>
                    <TextField
                        className={`${signUpStyleClass}__input`}
                        label="First Name"
                        variant="filled"
                        error={!!userErrors.firstName}
                        helperText={!!userErrors.firstName ? userErrors.firstName : ''}
                        onChange={onTextFieldChange('firstName')}
                    />
                </div>
                <div className={`${signUpStyleClass}__input_container`}>
                    <TextField
                        className={`${signUpStyleClass}__input`}
                        label="Last Name"
                        variant="filled"
                        error={!!userErrors.lastName}
                        helperText={!!userErrors.lastName ? userErrors.lastName : ''}
                        onChange={onTextFieldChange('lastName')}
                    />
                </div>
                <div className={`${signUpStyleClass}__input_container`}>
                    <TextField
                        className={`${signUpStyleClass}__input`}
                        label="Email"
                        variant="filled"
                        error={!!userErrors.email}
                        helperText={!!userErrors.email ? userErrors.email : ''}
                        onChange={onTextFieldChange('email')}
                    />
                </div>
                <div className={`${signUpStyleClass}__input_container`}>
                    <TextField
                        className={`${signUpStyleClass}__input`}
                        label="Password"
                        variant="filled"
                        error={!!userErrors.password}
                        helperText={!!userErrors.password ? userErrors.password : ''}
                        type="password"
                        onChange={onTextFieldChange('password')}
                    />
                </div>

                <div className={`${signUpStyleClass}__button_container`}>
                    <Button
                        className={`${signUpStyleClass}__button`}
                        variant="contained"
                        color="primary"
                        onClick={createUser}>
                        Sign up
                    </Button>
                </div>

                <div className={`${signUpStyleClass}__link_container`}>
                    Already a member?{' '}
                    <TextLink link={links.USER.SIGN_IN} text={'Sign in now'} styleClass={'link__standard'} />
                    &#46;
                </div>
            </div>
        </>
    );
}

export default SignUp;
