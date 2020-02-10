import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { validate } from 'validate.js';

import { deepCopy } from '../../utils/utils';
import { Button } from '../commons/button';
import { StackedInput } from '../commons/inputs';
import { EventInterface } from '../interfaces/interfaces';
import { EditProfileInterface } from '../interfaces/profile';

import { editProfileConstraints } from '../validators/authentication';

function EditProfile({ defaultProfileValues, styleClass, themeStyleClass }: EditProfileInterface) {
    const preventDefault = (event: any) => event.preventDefault();
    const [profile, setProfile] = React.useState(defaultProfileValues);
    const [profileErrors, setProfileErrors] = React.useState(userInfoInitialState());

    function checkEmpty(value: string) {
        return !!value ? value[0] : '';
    }

    function userInfoInitialState() {
        return {
            email: '',
            name: '',
            password: '',
            pictureUrl: '',
            preferredName: '',
            telephone: '',
            timezone: '',
        };
    }

    function validateUserInputs(userInputs: object, constraints: object, fullMessages: boolean = false) {
        return validate(userInputs, constraints, { fullMessages });
    }

    function onTextFieldChange(key: string) {
        return function(event: EventInterface) {
            preventDefault(event);

            const updatedProfileInfo = deepCopy(profile);
            updatedProfileInfo[key] = event.target.value;
            let errors = validateUserInputs(updatedProfileInfo, editProfileConstraints);

            errors = errors || {};
            setProfileErrors(errors);
            setProfile(updatedProfileInfo);
        };
    }

    return (
        <div>
            <div style={{ backgroundColor: 'white', padding: '5%' }}>
                <Typography gutterBottom variant="h5" component="h2">
                    Edit Profile
                </Typography>

                <div className={themeStyleClass.root}>
                    <StackedInput
                        label={'Name'}
                        defaultValue={defaultProfileValues.name}
                        onChange={onTextFieldChange('name')}
                        errorMsg={checkEmpty(profileErrors.name)}
                    />
                    <StackedInput
                        label={'Preferred Name'}
                        defaultValue={defaultProfileValues.preferredName}
                        onChange={onTextFieldChange('preferredName')}
                        errorMsg={checkEmpty(profileErrors.preferredName)}
                    />
                    <StackedInput
                        label={'Email'}
                        defaultValue={defaultProfileValues.email}
                        onChange={onTextFieldChange('email')}
                        errorMsg={checkEmpty(profileErrors.email)}
                    />
                    <StackedInput
                        label={'Telephone Number'}
                        defaultValue={defaultProfileValues.telephone}
                        onChange={onTextFieldChange('telephone')}
                        errorMsg={checkEmpty(profileErrors.telephone)}
                    />
                    <StackedInput
                        label={'Timezone'}
                        defaultValue={defaultProfileValues.timezone}
                        onChange={onTextFieldChange('timezone')}
                        errorMsg={checkEmpty(profileErrors.timezone)}
                    />
                    <StackedInput
                        label={'Picture Url'}
                        defaultValue={defaultProfileValues.pictureUrl}
                        onChange={onTextFieldChange('pictureUrl')}
                        errorMsg={checkEmpty(profileErrors.pictureUrl)}
                    />
                </div>
                <div className={`${styleClass}__align_right`}>
                    <Button label={'cancel'} styleClass={'cancel-btn'} />
                    <Button label={'save'} styleClass={'save-btn'} />
                </div>
            </div>
        </div>
    );
}

export { EditProfile };
