import * as React from 'react';

import Typography from '@material-ui/core/Typography';

import { Button } from '../commons/button';
import { StackedInput } from '../commons/inputs';
import { ChangePasswordInterface } from '../interfaces/profile';

function ChangePassword({ styleClass, themeStyleClass }: ChangePasswordInterface) {
    return (
        <div>
            <div style={{ backgroundColor: 'white', padding: '5%' }}>
                <Typography gutterBottom variant="h5" component="h2">
                    Change Password
                </Typography>

                <div className={themeStyleClass.root}>
                    <StackedInput label={'Current Password'} value={''} />
                    <StackedInput label={'New Password'} value={''} />
                    <StackedInput label={'Confirm Password'} value={''} />
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
