interface puzzleInterface {
    puzzle: Array<Array<number>>,
    mainPuzzleKey: number,
    secPuzzleKey?: number
}

interface gridInterface {
    type: number
}

interface eventInterface {
    target: any,
    key?: any,
    preventDefault?: any
}

interface  routeLinkInterface {
    link: string,
    component: JSX.Element,
    styleClass: string
}

interface textLinkInterface {
    text: string,
    link: string,
    styleClass?: string
}

interface gridRowInterface {
    numItems: number,
    sudokuGridClass: string,
    puzzle: puzzleInterface,
    keyDown: (row: number, col: number) => any
}
interface keyInterface {
    indexKey: string,
    puzzle: puzzleInterface
    keyDown: (row: number, col: number) => any
}

interface gameIntroInterface {
    gameClass: string
}

interface footerInterface {
    footerClass: string
}

interface labelInterface {
    text: string,
    href: string,
    style?: string
}

interface logoInterface {
    primaryLabel: labelInterface,
    secLabel?: labelInterface,
}

interface linkInterface {
    name: string,
    href: string,
    linkClass?: string,
}

interface navbarInterface {
    primaryLabel: labelInterface,
    secLabel?: labelInterface,
    navbarClass?: string;
    links: Array<linkInterface>
}

export {
    gridInterface, eventInterface, routeLinkInterface, gridRowInterface, keyInterface, gameIntroInterface ,
    footerInterface, puzzleInterface, logoInterface, linkInterface, navbarInterface, textLinkInterface, labelInterface
}
