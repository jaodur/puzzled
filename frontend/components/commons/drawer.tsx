import * as React from 'react';

import Divider from '@material-ui/core/Divider';
import UIDrawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import { TemporaryDrawerInterface } from '../interfaces/drawer';

const useStyles = makeStyles({
    list: {
        width: '25vw',
    },
    fullList: {
        width: 'auto',
    },
});

function TemporaryDrawer({ elements, side, open, toggleDrawer }: TemporaryDrawerInterface) {
    const classes = useStyles({});

    const sideList = () => (
        <div className={classes.list} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <UIDrawer anchor={side} open={open} onClose={toggleDrawer(false)}>
                {sideList()}
            </UIDrawer>
        </div>
    );
}

export { TemporaryDrawer };
