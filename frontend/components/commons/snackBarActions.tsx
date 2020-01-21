import * as React from 'react';
import ClearIcon from '@material-ui/icons/Clear';

function closeAction(closeSnackbar: any) {
    return function cAction(key: any) {
        return (
            <>
                <button className={'actions__secondary'} onClick={() => closeSnackbar(key)}><ClearIcon/></button>
            </>
        );
    };
}

export { closeAction };
