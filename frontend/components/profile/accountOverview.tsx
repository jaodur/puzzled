import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { LinkButton } from '../commons/button';
import { LinearInput } from '../commons/inputs';
import { links } from '../commons/linkUrls';
import { AccountOverviewInterface } from '../interfaces/profile';

function AccountOverview({ profile, styleClass, themeStyleClass }: AccountOverviewInterface) {
    return (
        <div>
            <div style={{ backgroundColor: 'white', padding: '5%' }}>
                <Typography gutterBottom variant="h5" component="h2">
                    Profile
                </Typography>

                <div className={themeStyleClass.root}>
                    <LinearInput label={'Name'} value={profile.name} disabled />
                    <LinearInput label={'Preferred Name'} value={profile.preferredName} disabled />
                    <LinearInput label={'Email'} value={profile.email} disabled />
                    <LinearInput label={'Telephone Number'} value={profile.telephone || ''} disabled />
                    <LinearInput label={'Timezone'} value={profile.timezone || ''} disabled />
                    <LinearInput label={'Picture Url'} value={profile.pictureUrl || ''} disabled />
                </div>
                <div className={`${styleClass}__align_right`}>
                    <LinkButton
                        href={links.USER.PROFILE.EDIT_PROFILE}
                        label={'edit profile'}
                        styleClass={'save-btn std-btn-mt'}
                    />
                </div>
            </div>
        </div>
    );
}

export { AccountOverview };
