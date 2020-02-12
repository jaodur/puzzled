import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import { blue, deepOrange, deepPurple, green, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProfileIcon from '@material-ui/icons/PersonOutline';
import { useMutation } from 'react-apollo-hooks';

import { LOGOUT_MUTATION } from '../../graphql/mutations/authentication';
import { avatarLetterStyleClass } from '../../utils/singletons/avatar';
import { EventInterface } from '../interfaces/interfaces';
import { AvatarInterface } from '../interfaces/profile';
import { links } from './linkUrls';
import { useCheckLoginContext } from './puzzleContext';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    red: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
    },
    blue: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
    },
    green: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    xsmall: {
        display: 'flex',
        alignItems: 'center',
        width: '40px',
        height: '40px',
        margin: '0',
    },
    xlarge: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        fontSize: '4rem',
    },
}));

function ProfileAvatar({ src, profileName, onClick, styleClass, small }: AvatarInterface) {
    const classes: any = useStyles({});

    function getAvatarLetters(name: string, maxLetters: number = 2) {
        const initials = (name.match(/\b\w/g) || []).slice(0, maxLetters);

        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }

    const sizeStyle = !!small ? classes.xsmall : classes.xlarge;

    return (
        <div className={styleClass} onClick={onClick}>
            {!!src ? (
                <Avatar alt={profileName} src={src} />
            ) : (
                <Avatar className={`${classes[avatarLetterStyleClass]} ${sizeStyle}`}>
                    {!!small ? getAvatarLetters(profileName, 1) : getAvatarLetters(profileName)}
                </Avatar>
            )}
        </div>
    );
}

function NavBarProfileAvatar({ src, profileName }: AvatarInterface) {
    const history = useHistory();
    const [showDropdown, setShowDropdown] = React.useState(false);
    // eslint-disable-next-line
    const [logoutUserFunc, setLogoutUserFunc] = useMutation(LOGOUT_MUTATION);
    const { asyncUpdateLoginInfo } = useCheckLoginContext();

    function toggleShowDropdown() {
        setShowDropdown(!showDropdown);
    }

    async function logoutUser(event: EventInterface) {
        event.preventDefault();

        await logoutUserFunc().then(async () => {
            await asyncUpdateLoginInfo(() => {});
        });

        history.push(links.HOME);
    }

    return (
        <div className={'navbar-avatar'}>
            <span onClick={toggleShowDropdown}>{profileName}</span>
            <ProfileAvatar src={src} profileName={profileName} small onClick={toggleShowDropdown} />
            {showDropdown ? (
                <ExpandLessIcon onClick={toggleShowDropdown} />
            ) : (
                <ExpandMoreIcon onClick={toggleShowDropdown} />
            )}

            <Collapse className={'navbar-avatar__dropdown'} in={showDropdown} timeout="auto" unmountOnExit>
                <div>
                    <Link to={links.USER.PROFILE.HOME} onClick={toggleShowDropdown}>
                        <span>
                            <ProfileIcon /> profile
                        </span>
                    </Link>
                    <span onClick={logoutUser}>
                        <LogoutIcon /> logout
                    </span>
                </div>
            </Collapse>
        </div>
    );
}

export { NavBarProfileAvatar, ProfileAvatar };
