import * as React from "react";
import {Button} from "@material-ui/core";


function closeAction(closeSnackbar: any){
    return (key:any) => (
        <>
            <button className={'actions__secondary'} onClick={() => { closeSnackbar(key) }}>
                Close
            </button>
        </>
    )
}

export { closeAction }