import * as React from 'react';
import { useState } from 'react'
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const primary = red[400];
const success = green[400];

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 400,
        minWidth: 344,
    },
    typography: {
        fontWeight: 'bold',
    },
    actionDanger: {
        padding: '8px 8px 8px 16px',
        backgroundColor: primary,
    },
    actionWarning: {
        padding: '8px 8px 8px 16px',
        backgroundColor: '#fddc6c',
    },
    actionSuccess: {
        padding: '8px 8px 8px 16px',
        backgroundColor: success,
    },
     actionPrimary: {
        padding: '8px 8px 8px 16px',
        backgroundColor: success,
    },
    icons: {
        marginLeft: 'auto',
    },
    expand: {
        padding: '8px 8px',
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    collapse: {
        padding: 16,
    },
    checkIcon: {
        fontSize: 20,
        color: '#b3b3b3',
        paddingRight: 4,
    },
    button: {
        padding: 0,
        textTransform: 'none',
    },
}));

function getRootColor(key: string) {
    const colorMapper: any = {
        primary: "actionPrimary", secondary: "actionDanger", success: "actionSuccess", warning: "actionWarning"
    };

    return colorMapper[key] || "actionWarning";
}

const CustomContentWrapper = React.forwardRef((props:any, ref:any) => {
    const classes: any = useStyles(props);
    const { closeSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDismiss = () => {
        closeSnackbar(props.id);
    };

    return (
        <Card className={classes.card} ref={ref} >
            <CardActions classes={{ root: classes[getRootColor(props.color)] }}>
                <Typography variant="subtitle2" className={classes.typography}>{props.message}</Typography>
                <div className={classes.icons}>
                    <IconButton
                        aria-label="Show more"
                        className={classnames(classes.expand, { [classes.expandOpen]: expanded })}
                        onClick={handleExpandClick}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                    <IconButton className={classes.expand} onClick={handleDismiss}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Paper className={classes.collapse}>
                    <Typography gutterBottom>Detailed Information</Typography>
                    <Button size="small" className={classes.button}>
                        <CheckCircleIcon className={classes.checkIcon} />
                        {props.message}
                    </Button>
                </Paper>
            </Collapse>
        </Card>
    );
});

export { CustomContentWrapper }
