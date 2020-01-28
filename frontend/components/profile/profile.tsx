import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import HomeIcon from '@material-ui/icons/HomeOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import NotificationOutlinedIcon from '@material-ui/icons/NotificationsOutlined'
import { makeStyles } from '@material-ui/core/styles';

import { AccountOverview } from "./accountOverview";
import { ProfileAvatar } from "../commons/avatar";
import { SidebarTab } from "../commons/sidebarTab";
import {renderElement} from "../../utils/utils";


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

function Profile(){
    const classes = useStyles({})
    return (
        <div className={profileStyleClass}>
            <div className={`${profileStyleClass}__title-wrapper`}>
                <div className={`${profileStyleClass}__card`}>
                    <ProfileAvatar profileName={'Odur j'} avatarLetters={'an'} styleClass={`${profileStyleClass}__avatar`} />
                    <SidebarTab href={'/profile/account-overview'} icon={<HomeIcon />} fillText={'account overview'} styleClass={sidebarTabStyleClass}/>
                    <SidebarTab href={'/profile/edit-profile'} icon={<EditOutlinedIcon />} fillText={'edit profile'} styleClass={sidebarTabStyleClass}/>
                    <SidebarTab href={'/profile/change-password'} icon={<LockOutlinedIcon />} fillText={'change password'} styleClass={sidebarTabStyleClass}/>
                    <SidebarTab href={'/profile/notifications'} icon={<NotificationOutlinedIcon />} fillText={'notifications'} styleClass={sidebarTabStyleClass}/>
                </div>
            </div>

            <div className={`${profileStyleClass}__content`}>

                <Switch>
                    <Route
                        exact
                        path='/profile/account-overview'
                        component={renderElement(
                            <AccountOverview
                                styleClass={profileStyleClass}
                                themeStyleClass={classes}
                            />
                        )}
                    />
                    <Redirect to={'/profile/account-overview'}/>

                </Switch>
            </div>

        </div>
    )
}

export { Profile }
