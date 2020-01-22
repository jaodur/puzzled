import ClearIcon from '@material-ui/icons/Clear';
import * as React from 'react';

function closeAction(closeSnackbar: any) {
    return function cAction(key: any) {
        return (
            <>
                <button className={'actions__secondary'} onClick={() => closeSnackbar(key)}>
                    <ClearIcon />
                </button>
            </>
        );
    };
}

export { closeAction };
