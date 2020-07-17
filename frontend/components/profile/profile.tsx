import * as React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

import { useQuery } from 'react-apollo-hooks';

import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import NotificationOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import { withSnackbar } from 'notistack';

import Collapse from '@material-ui/core/Collapse';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PROFILE_QUERY } from '../../graphql/queries/profile';
import { deepCopy, renderElement } from '../../utils/utils';
import { ProfileAvatar } from '../commons/avatar';
import { links } from '../commons/linkUrls';
import { useCheckLoginContext } from '../commons/puzzleContext';
import { SidebarTab } from '../commons/sidebarTab';
import { ProfileDropdownInterface } from '../interfaces/navbar';
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

function useQueryProfile(email: string) {
    const { loading, error, data, refetch } = useQuery(PROFILE_QUERY, { variables: { email } });

    return { profileData: data, profileLoading: loading, profileError: error, profileRefetch: refetch };
}

function ProfileDropdown({ value, show, toggleDropdown, setDropdownHeader }: ProfileDropdownInterface) {
    const iconMapper: any = {
        'account overview': <HomeIcon />,
        'edit profile': <EditOutlinedIcon />,
        'change password': <LockOutlinedIcon />,
        notifications: <NotificationOutlinedIcon />,
    };
    return (
        <div className={'c-profile-dropdown'}>
            <div className={'t-profile-dropdown'} onClick={toggleDropdown}>
                <span>
                    {iconMapper[value.toLowerCase()]} {value}
                </span>
                {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            <Collapse className={'profile-dropdown'} in={show} timeout="auto" unmountOnExit>
                <div className={'profile-dropdown__content'}>
                    <Link to={links.USER.PROFILE.ACCOUNT_OVERVIEW} onClick={setDropdownHeader('account overview')}>
                        <span>
                            <HomeIcon /> account overview
                        </span>
                    </Link>
                    <Link to={links.USER.PROFILE.EDIT_PROFILE} onClick={setDropdownHeader('edit profile')}>
                        <span>
                            <EditOutlinedIcon /> edit profile
                        </span>
                    </Link>
                    <Link to={links.USER.PROFILE.CHANGE_PASSWORD} onClick={setDropdownHeader('change password')}>
                        <span>
                            <LockOutlinedIcon /> change password
                        </span>
                    </Link>
                    <Link to={links.USER.PROFILE.NOTIFICATIONS} onClick={setDropdownHeader('notifications')}>
                        <span>
                            <NotificationOutlinedIcon /> notifications
                        </span>
                    </Link>
                </div>
            </Collapse>
        </div>
    );
}

function Profile() {
    const classes = useStyles({});
    const { checkLogin } = useCheckLoginContext();
    const [profile, setProfile] = React.useState(deepCopy(checkLogin._loginInfo.user));
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [dropdownHeader, setDropdownHeader] = React.useState('account overview');
    const { profileData, profileLoading, profileError } = useQueryProfile(profile.email);

    React.useEffect(() => {
        if (!profileLoading) {
            if (profileError) {
                return;
            }
            setProfile(deepCopy(profileData.profile));
        }
    }, [profileLoading]);

    function toggleDropdown() {
        setShowDropdown(!showDropdown);
    }

    const setDropHeader = (value: string) => () => {
        setDropdownHeader(value);
        setShowDropdown(!showDropdown);
    };

    return (
        <div className={profileStyleClass}>
            <div className={`${profileStyleClass}__title-wrapper`}>
                <ProfileDropdown
                    value={dropdownHeader}
                    show={showDropdown}
                    toggleDropdown={toggleDropdown}
                    setDropdownHeader={setDropHeader}
                />
                <div className={`${profileStyleClass}__card`}>
                    <ProfileAvatar profileName={profile.name} className={`${profileStyleClass}__avatar`} />
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
                            <AccountOverview
                                profile={profile}
                                styleClass={profileStyleClass}
                                themeStyleClass={classes}
                            />
                        )}
                    />
                    <Route
                        exact
                        path={links.USER.PROFILE.EDIT_PROFILE}
                        component={renderElement(
                            <EditProfile
                                defaultProfileValues={profile}
                                styleClass={profileStyleClass}
                                themeStyleClass={classes}
                            />
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

export default withSnackbar(Profile);
