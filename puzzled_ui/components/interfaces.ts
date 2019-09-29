interface fullPuzzleInterface {
    puzzle: Array<Array<number>>,
    mainPuzzleKey: number,
    secPuzzleKey?: number
}

interface gridInterface {
    type: number,
    playController?: boolean
}

interface numPadInterface extends gridInterface {
    gridClass: string,
    onPadClick: (event: eventInterface) => any,
    startNum?: number
}

interface eventInterface {
    target: any,
    key?: any,
    preventDefault?: any,
    keyCode?: number
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
    puzzle: fullPuzzleInterface,
    keyDown: (row: number, col: number) => any,
    clickFunc: (row: number, col: number) => any,
    decorateFunc: (className: string, row: number, col: number) => string
}
interface sudokuTableDataInterface {
    indexKey: string,
    puzzle: fullPuzzleInterface
    keyDown: (row: number, col: number) => any,
    clickFunc: (row: number, col: number) => any,
    decorateFunc: (className: string, row: number, col: number) => string
}

interface GridTableInterface {
    CreateTableRow: (gridNums: number, onKeyDown: any, puzzle: number[][]) => any,
    sudokuGridClass: string,
    gridState: any
    onKeyDown:(row: number, col: number) => any,
    puzzle: number[][],
    showCongsMsg: boolean,
    onClick: (generate: any) => any,
    playing: boolean,
    onPlayPauseClick: any
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
    activeClassName?: string,
    onTabClick?: (event: eventInterface) => any
}

interface navbarInterface {
    onTabClick?: (event: eventInterface) => any,
    primaryLabel: labelInterface,
    secLabel?: labelInterface,
    navbarClass?: string;
    links: Array<linkInterface>
}

interface svgIconInterface {
    fillColor?: string,
    width?: string,
    height?: string,
    styleClass?: string,
    onClick?: any
}

interface sudokuPad {
    onTypeChange: (event: eventInterface) => any,
}

interface solveSudokuPadInterface extends sudokuPad  {
    solvePuzzle: (solve: any) => any,
    clearPuzzle: (event: eventInterface) => any
}

interface playSudokuPadInterface extends sudokuPad {
    onDifficultyChange: (event: eventInterface) => any,
    generatePuzzle: (generate: any) => any,
    resetPuzzle: (event: eventInterface) => any,
    totalSeconds: number,
    playing: boolean,
    onClick: any,
    stopTimer: boolean
}

interface congratulationInterface {
    className: string,
    onClick: (generate: any) => any
}

interface pauseInterface {
    className: string,
    onPlayIconClick: (generate: any) => any
}

interface timerInterface {
    styleClass:string,
    playing: boolean,
    totalSeconds: number,
    onClick: any,
    stopTimer: boolean
}

export {
    gridInterface, eventInterface, routeLinkInterface, gridRowInterface, sudokuTableDataInterface, gameIntroInterface ,
    footerInterface, fullPuzzleInterface, logoInterface, linkInterface, navbarInterface, textLinkInterface,
    labelInterface, numPadInterface, svgIconInterface, solveSudokuPadInterface, playSudokuPadInterface,
    congratulationInterface, GridTableInterface, timerInterface, pauseInterface
}
