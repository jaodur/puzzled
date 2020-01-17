import { NavbarLinksInterface } from '../interfaces/interfaces';
import { links } from "./linkUrls";

const linkNoStyle: string = 'link__no-style';

const defaultNavBarLinks: NavbarLinksInterface = {
    primaryLabel: { text: 'puzzled', href: links.HOME, style: linkNoStyle },
    secLabel: { text: null, href: '#' },
    links: [
        { name: 'Games', href: '#' },
        { name: 'Pin', href: '#' },
        { name: null, href: '#', linkClass: 'navbar-separator' },
        { name: 'Sign In', href: links.USER.SIGN_IN },
        { name: 'Sign Up', href: links.USER.SIGN_UP },
    ],
};

const sudokuNavBarLinks: NavbarLinksInterface = {
    primaryLabel: { text: '', href: links.HOME, style: linkNoStyle },
    secLabel: { text: '', href: links.SUDOKU.HOME, style: linkNoStyle },
    links: [
        { name: 'Play', href: links.SUDOKU.PLAY },
        { name: 'Solve', href: links.SUDOKU.SOLVE },
        { name: 'Trainer', href: links.SUDOKU.TRAINER },
        { name: 'Help', href: '#' },
        { name: null, href: '#', linkClass: 'navbar-separator' },
    ],
};

export { defaultNavBarLinks, sudokuNavBarLinks };
