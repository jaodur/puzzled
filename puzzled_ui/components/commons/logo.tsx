import * as React from "react";
import { logoInterface } from "../interfaces";


function Logo({ primaryLabel, secLabel }: logoInterface) {
    return (
        <div className='logo'>
            { primaryLabel }<span>{ secLabel }</span>
        </div>
    )
}

export { Logo }
