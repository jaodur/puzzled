interface FullPuzzleInterface {
    puzzle: number[][];
    mainPuzzleKey: number;
    secPuzzleKey?: number;
}

interface GridInterface {
    type: number;
    playController?: boolean;
}

interface NumPadInterface extends GridInterface {
    gridClass: string;
    onPadClick: (event: EventInterface) => any;
    startNum?: number;
}

interface EventInterface {
    target: any;
    key?: any;
    preventDefault?: any;
    keyCode?: number;
}

interface RouteLinkInterface {
    link: string;
    component: JSX.Element;
    styleClass: string;
}

interface TextLinkInterface {
    text: string;
    link: string;
    styleClass?: string;
}

interface GridRowInterface {
    numItems: number;
    sudokuGridClass: string;
    puzzle: FullPuzzleInterface;
    keyDown: (row: number, col: number) => any;
    clickFunc: (row: number, col: number) => any;
    decorateFunc: (className: string, row: number, col: number) => string;
}
interface SudokuTableDataInterface {
    indexKey: string;
    puzzle: FullPuzzleInterface;
    keyDown: (row: number, col: number) => any;
    clickFunc: (row: number, col: number) => any;
    decorateFunc: (className: string, row: number, col: number) => string;
}

interface GridTableInterface {
    CreateTableRow: (gridNums: number, onKeyDown: any, puzzle: number[][]) => any;
    sudokuGridClass: string;
    gridState: any;
    onKeyDown: (row: number, col: number) => any;
    puzzle: number[][];
    showCongsMsg: boolean;
    generatePuzzle: (event?: EventInterface) => any;
    playing: boolean;
    onPlayPauseClick: any;
    loader: boolean;
}

interface GameIntroInterface {
    gameClass: string;
}

interface FooterInterface {
    footerClass: string;
}

interface LabelInterface {
    text: string;
    href: string;
    style?: string;
}

interface LogoInterface {
    primaryLabel: LabelInterface;
    secLabel?: LabelInterface;
}

interface LinkInterface {
    name: string;
    href: string;
    linkClass?: string;
    activeClassName?: string;
    onTabClick?: (event: EventInterface) => any;
}

interface NavbarInterface {
    onTabClick?: (event: EventInterface) => any;
    primaryLabel: LabelInterface;
    secLabel?: LabelInterface;
    navbarClass?: string;
    links: LinkInterface[];
}

interface SvgIconInterface {
    fillColor?: string;
    width?: string;
    height?: string;
    styleClass?: string;
    onClick?: any;
}

interface SudokuPad {
    onTypeChange: (event: EventInterface) => any;
}

interface SolveSudokuPadInterface extends SudokuPad {
    solvePuzzle: (solve: any) => any;
    clearPuzzle: (event: EventInterface) => any;
}

interface PlaySudokuPadInterface extends SudokuPad {
    onDifficultyChange: (event: EventInterface) => any;
    generatePuzzle: (generate: any) => any;
    resetPuzzle: (event: EventInterface) => any;
    totalSeconds: number;
    playing: boolean;
    onClick: any;
    stopTimer: boolean;
}

interface CongratulationInterface {
    className: string;
    generatePuzzle: () => any;
}

interface PauseInterface {
    className: string;
    onPlayIconClick: (generate: any) => any;
}

interface TimerInterface {
    styleClass: string;
    playing: boolean;
    totalSeconds: number;
    onClick: any;
    stopTimer: boolean;
}

export {
    GridInterface,
    EventInterface,
    RouteLinkInterface,
    GridRowInterface,
    SudokuTableDataInterface,
    GameIntroInterface,
    FooterInterface,
    FullPuzzleInterface,
    LogoInterface,
    LinkInterface,
    NavbarInterface,
    TextLinkInterface,
    LabelInterface,
    NumPadInterface,
    SvgIconInterface,
    SolveSudokuPadInterface,
    PlaySudokuPadInterface,
    CongratulationInterface,
    GridTableInterface,
    TimerInterface,
    PauseInterface,
};
