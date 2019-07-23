interface gridInterface {
    num: number
}

interface eventInterface {
    target: any
}

interface  routeLinkInterface {
    link: string,
    component: JSX.Element,
    styleClass: string
}

interface gridRowInterface {
    numItems: number,
    sudokuGridClass: string
}
interface keyInterface {
    key: string
}

interface gameIntroInterface {
    gameClass: string
}

interface footerInterface {
    footerClass: string
}

export {
    gridInterface, eventInterface, routeLinkInterface, gridRowInterface, keyInterface, gameIntroInterface ,
    footerInterface
}
