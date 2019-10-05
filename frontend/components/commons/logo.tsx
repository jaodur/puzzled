import * as React from "react";
import { TextLink } from "./links";
import { logoInterface } from "../interfaces";


function Logo({ primaryLabel, secLabel }: logoInterface) {
    return (
        <div className='logo'>
            <TextLink text={ primaryLabel.text } link={ primaryLabel.href } styleClass={ primaryLabel.style }/>
            <span><TextLink text={ secLabel.text } link={ secLabel.href } styleClass={ secLabel.style }/></span>
        </div>
    )
}

export { Logo }
