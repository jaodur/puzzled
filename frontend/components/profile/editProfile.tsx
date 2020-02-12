import * as React from 'react';
import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-apollo-hooks';

import { UPDATE_USER_PROFILE_MUTATION } from '../../graphql/mutations/authentication';
import { renderSnackbar } from '../../utils/customSnackbar';
import { checkEmpty, deepCopy, isCleanForm } from '../../utils/utils';
import { validateUserInputs } from '../../utils/validation';
import { Button } from '../commons/button';
import { StackedInput } from '../commons/inputs';
import { links } from '../commons/linkUrls';
import { useCheckLoginContext } from '../commons/puzzleContext';
import { EventInterface } from '../interfaces/interfaces';
import { EditProfileInterface } from '../interfaces/profile';
import { editProfileConstraints } from '../validators/authentication';

function EditProfile({ defaultProfileValues, styleClass, themeStyleClass }: EditProfileInterface) {
    const preventDefault = (event: any) => event.preventDefault();
    const history = useHistory();
    const { checkLogin, asyncUpdateLoginInfo } = useCheckLoginContext();
    const [profile, setProfile] = React.useState({ ...defaultProfileValues, ...checkLogin._loginInfo.user });
    // eslint-disable-next-line
    const [updateProfile, setUpdateProfile] = useMutation(UPDATE_USER_PROFILE_MUTATION);
    const [profileErrors, setProfileErrors] = React.useState(userInfoInitialState());
    const { enqueueSnackbar } = useSnackbar();

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

    async function updateUserProfile(event: EventInterface) {
        preventDefault(event);

        const errors = validateUserInputs(profile, editProfileConstraints);

        if (!!errors) {
            setProfileErrors(errors || {});
            return;
        }

        await updateProfile({ variables: profile })
            .then(async (response: any) => {
                await asyncUpdateLoginInfo(() => {
                    setProfile(response.data.updateUser);
                });
                enqueueSnackbar('Profile updated successful', {
                    variant: 'success',
                    content: renderSnackbar('success'),
                });
                history.push(links.USER.PROFILE.EDIT_PROFILE);
            })
            .catch((response: any) => {
                enqueueSnackbar(response.graphQLErrors[0].message, {
                    variant: 'error',
                    content: renderSnackbar('secondary'),
                });
            });
    }

    function cancelProfileUpdate(event: EventInterface) {
        preventDefault(event);
        setProfile(defaultProfileValues);
        setProfileErrors(userInfoInitialState);
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
                        value={profile.name}
                        onChange={onTextFieldChange('name')}
                        errorMsg={checkEmpty(profileErrors.name)}
                    />
                    <StackedInput
                        label={'Preferred Name'}
                        value={profile.preferredName}
                        onChange={onTextFieldChange('preferredName')}
                        errorMsg={checkEmpty(profileErrors.preferredName)}
                    />
                    <StackedInput
                        label={'Email'}
                        value={profile.email}
                        onChange={onTextFieldChange('email')}
                        errorMsg={checkEmpty(profileErrors.email)}
                    />
                    <StackedInput
                        label={'Telephone Number'}
                        value={profile.telephone}
                        onChange={onTextFieldChange('telephone')}
                        errorMsg={checkEmpty(profileErrors.telephone)}
                    />
                    <StackedInput
                        label={'Timezone'}
                        value={profile.timezone}
                        onChange={onTextFieldChange('timezone')}
                        errorMsg={checkEmpty(profileErrors.timezone)}
                        disabled
                    />
                    <StackedInput
                        label={'Picture Url'}
                        value={profile.pictureUrl}
                        onChange={onTextFieldChange('pictureUrl')}
                        errorMsg={checkEmpty(profileErrors.pictureUrl)}
                        disabled
                    />
                </div>
                <div className={`${styleClass}__align_right`}>
                    <Button label={'cancel'} styleClass={'cancel-btn'} onBtnClick={cancelProfileUpdate} />
                    <Button
                        label={'save'}
                        styleClass={'save-btn'}
                        onBtnClick={updateUserProfile}
                        disabled={isCleanForm({ ...defaultProfileValues, ...checkLogin._loginInfo.user }, profile)}
                    />
                </div>
            </div>
        </div>
    );
}

export { EditProfile };
