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

interface logoInterface {
    text: string
}

interface linkInterface {
    name: string,
    href: string,
    linkClass?: string,
}

interface navbarInterface {
    navbarClass?: string;
    links: Array<linkInterface>
}

export {
    gridInterface, eventInterface, routeLinkInterface, gridRowInterface, keyInterface, gameIntroInterface ,
    footerInterface, puzzleInterface, logoInterface, linkInterface, navbarInterface
}
