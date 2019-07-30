import * as React from "react";
import { logoInterface } from "../interfaces";


function Logo({ text }: logoInterface) {
    return (
        <div className='logo'>
            { text }
        </div>
    )
}

export { Logo }
