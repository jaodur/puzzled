import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import NotificationOutlinedIcon from '@material-ui/icons/NotificationsOutlined';

import { renderElement } from '../../utils/utils';
import { ProfileAvatar } from '../commons/avatar';
import { links } from '../commons/linkUrls';
import { SidebarTab } from '../commons/sidebarTab';
import { AccountOverview } from './accountOverview';
import { ChangePassword } from './changePassword';
import { EditProfile } from './editProfile';

const profileStyleClass: string = 'profile';
const sidebarTabStyleClass: string = 'default-sidebar-tab';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

function Profile() {
    const classes = useStyles({});
    return (
        <div className={profileStyleClass}>
            <div className={`${profileStyleClass}__title-wrapper`}>
                <div className={`${profileStyleClass}__card`}>
                    <ProfileAvatar profileName={'Odur j'} styleClass={`${profileStyleClass}__avatar`} />
                    <SidebarTab
                        href={links.USER.PROFILE.ACCOUNT_OVERVIEW}
                        icon={<HomeIcon />}
                        fillText={'account overview'}
                        styleClass={sidebarTabStyleClass}
                    />
                    <SidebarTab
                        href={links.USER.PROFILE.EDIT_PROFILE}
                        icon={<EditOutlinedIcon />}
                        fillText={'edit profile'}
                        styleClass={sidebarTabStyleClass}
                    />
                    <SidebarTab
                        href={links.USER.PROFILE.CHANGE_PASSWORD}
                        icon={<LockOutlinedIcon />}
                        fillText={'change password'}
                        styleClass={sidebarTabStyleClass}
                    />
                    <SidebarTab
                        href={links.USER.PROFILE.NOTIFICATIONS}
                        icon={<NotificationOutlinedIcon />}
                        fillText={'notifications'}
                        styleClass={sidebarTabStyleClass}
                    />
                </div>
            </div>

            <div className={`${profileStyleClass}__content`}>
                <Switch>
                    <Route
                        exact
                        path={links.USER.PROFILE.ACCOUNT_OVERVIEW}
                        component={renderElement(
                            <AccountOverview styleClass={profileStyleClass} themeStyleClass={classes} />
                        )}
                    />
                    <Route
                        exact
                        path={links.USER.PROFILE.EDIT_PROFILE}
                        component={renderElement(
                            <EditProfile styleClass={profileStyleClass} themeStyleClass={classes} />
                        )}
                    />
                    <Route
                        exact
                        path={links.USER.PROFILE.CHANGE_PASSWORD}
                        component={renderElement(
                            <ChangePassword styleClass={profileStyleClass} themeStyleClass={classes} />
                        )}
                    />
                    <Redirect to={links.USER.PROFILE.ACCOUNT_OVERVIEW} />
                </Switch>
            </div>
        </div>
    );
}

export { Profile };
