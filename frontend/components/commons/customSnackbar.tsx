import * as React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classnames from 'classnames';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const danger = red[400];
const success = green[400];
const warning = orange[400];

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 400,
        minWidth: 344,
    },
    typography: {
        fontWeight: 'bold',
        minWidth: '70%',
    },
    actionDanger: {
        padding: '8px 8px 8px 16px',
        backgroundColor: danger,
        color: theme.palette.getContrastText(danger),
        textAlign: 'center',
    },
    actionWarning: {
        padding: '8px 8px 8px 16px',
        backgroundColor: warning,
        color: theme.palette.getContrastText(warning),
        textAlign: 'center',
    },
    actionSuccess: {
        padding: '8px 8px 8px 16px',
        backgroundColor: success,
        color: theme.palette.getContrastText(success),
        textAlign: 'center',
    },
    actionPrimary: {
        padding: '8px 8px 8px 16px',
        backgroundColor: success,
        color: theme.palette.getContrastText(success),
        textAlign: 'center',
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
    iconDanger: {
        color: theme.palette.getContrastText(danger),
    },
    iconWarning: {
        color: theme.palette.getContrastText(warning),
    },
    iconSuccess: {
        color: theme.palette.getContrastText(success),
    },
    iconPrimary: {
        color: theme.palette.getContrastText(success),
    },
    button: {
        padding: 0,
        textTransform: 'none',
    },
}));

function getRootColor(key: string) {
    const colorMapper: any = {
        primary: 'actionPrimary',
        secondary: 'actionDanger',
        success: 'actionSuccess',
        warning: 'actionWarning',
    };

    return colorMapper[key] || 'actionWarning';
}

function getIconColor(key: string) {
    const iconColorMapper: any = {
        primary: 'iconPrimary',
        secondary: 'iconDanger',
        success: 'iconSuccess',
        warning: 'iconWarning',
    };
    return iconColorMapper[key] || 'actionWarning';
}

const CustomSnackbarContentWrapper = React.forwardRef(function CustomSnackbar(props: any, ref: any) {
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
        <Card className={classes.card} ref={ref}>
            <CardActions classes={{ root: classes[getRootColor(props.color)] }}>
                <Typography variant="subtitle2" className={classes.typography}>
                    {props.message}
                </Typography>
                <div className={classes.icons}>
                    <IconButton
                        aria-label="Show more"
                        className={classnames(
                            classes.expand,
                            { [classes.expandOpen]: expanded },
                            classes[getIconColor(props.color)]
                        )}
                        onClick={handleExpandClick}>
                        <ExpandMoreIcon />
                    </IconButton>
                    <IconButton className={classes.expand} onClick={handleDismiss}>
                        <CloseIcon className={classes[getIconColor(props.color)]} />
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

export { CustomSnackbarContentWrapper };
