import * as React from 'react';
import { CustomSnackbarContentWrapper } from '../components/commons/customSnackbar';

function renderSnackbar(color: string) {
    return function customSnackbar(key: any, message: string) {
        return <CustomSnackbarContentWrapper id={key} message={message} color={color} />;
    };
}

export { renderSnackbar };
