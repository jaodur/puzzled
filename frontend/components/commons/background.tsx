import * as React from 'react'

import classNames from 'classnames'

import { BackgroundInterface } from "../interfaces/background";

function ThickBlueBackground({styleClass}: BackgroundInterface){
    return <div className={classNames('thick-blue-bg', styleClass)}/>
}

export { ThickBlueBackground }
