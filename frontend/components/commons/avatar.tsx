import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';
import { blue, deepOrange, deepPurple, green, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { avatarLetterStyleClass } from '../../utils/singletons/avatar';
import { AvatarInterface } from '../interfaces/profile';

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

function ProfileAvatar({ src, profileName, styleClass, small }: AvatarInterface) {
    const classes: any = useStyles({});

    function getAvatarLetters(name: string, maxLetters: number = 2) {
        const initials = (name.match(/\b\w/g) || []).slice(0, maxLetters);

        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }

    const sizeStyle = !!small ? classes.xsmall : classes.xlarge;

    return (
        <div className={styleClass}>
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
    return (
        <div className={'navbar-avatar'}>
            <span>{profileName}</span>
            <ProfileAvatar src={src} profileName={profileName} small />
            <ExpandMoreIcon />
        </div>
    );
}

export { NavBarProfileAvatar, ProfileAvatar };
