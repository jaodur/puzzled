import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ChatOutlined from '@material-ui/icons/ChatOutlined';

function ChatIcon({ size = '32px' }) {
    const useStyles = makeStyles({
        root: {
            fontSize: size,
        },
    });
    const classes = useStyles({});

    return <ChatOutlined className={classes.root} />;
}

export { ChatIcon };
