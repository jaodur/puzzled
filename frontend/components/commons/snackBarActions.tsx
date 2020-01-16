import * as React from "react";


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