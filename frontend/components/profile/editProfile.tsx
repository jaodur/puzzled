import * as React from 'react';

import Typography from "@material-ui/core/Typography";

import { StackedInput } from "../commons/inputs";
import { EditProfileInterface } from "../interfaces/profile";
import { Button } from "../commons/button";


function EditProfile({styleClass, themeStyleClass}: EditProfileInterface) {
    return (
        <div>
            <div style={{ backgroundColor: 'white', padding: '5%' }}>
                <Typography gutterBottom variant="h5" component="h2">
                    Edit Profile
                </Typography>

                <div className={themeStyleClass.root}>
                    <StackedInput label={'Email'} value={'odurjoseph8@gmail.com'} />
                    <StackedInput label={'Email'} value={'odurjoseph8@gmail.com'} />
                    <StackedInput label={'Email'} value={'odurjoseph8@gmail.com'} />
                    <StackedInput label={'Email'} value={'odurjoseph8@gmail.com'} />
                    <StackedInput label={'Email'} value={'odurjoseph8@gmail.com'} />
                    <StackedInput label={'Email'} value={'odurjoseph8@gmail.com'} />
                    <StackedInput label={'Email'} value={'odurjoseph8@gmail.com'} />
                </div>
                <div className={`${styleClass}__align_right`}>
                    <Button label={'cancel'} styleClass={'cancel-btn'}/>
                    <Button label={'save'} styleClass={'save-btn'}/>
                </div>
            </div>
        </div>
    )
}

export { EditProfile }
