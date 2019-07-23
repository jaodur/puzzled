interface sudokuGridInterface {
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

export { sudokuGridInterface, eventInterface }