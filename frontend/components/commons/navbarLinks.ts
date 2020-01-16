import { NavbarLinksInterface } from '../interfaces/interfaces';
const linkNoStyle: string = 'link__no-style';

const defaultNavBarLinks: NavbarLinksInterface = {
    primaryLabel: { text: 'puzzled', href: '/', style: linkNoStyle },
    secLabel: { text: null, href: '#' },
    links: [
        { name: 'Games', href: '#' },
        { name: 'Pin', href: '#' },
        { name: null, href: '#', linkClass: 'navbar-separator' },
        { name: 'Sign In', href: '#' },
        { name: 'Sign Up', href: '#' },
    ],
};

const sudokuNavBarLinks: NavbarLinksInterface = {
    primaryLabel: { text: '', href: '/', style: linkNoStyle },
    secLabel: { text: '', href: '/sudoku/', style: linkNoStyle },
    links: [
        { name: 'Play', href: '/sudoku/play/' },
        { name: 'Solve', href: '/sudoku/solve/' },
        { name: 'Trainer', href: '/sudoku/trainer/' },
        { name: 'Help', href: '#' },
        { name: null, href: '#', linkClass: 'navbar-separator' },
    ],
};

export { defaultNavBarLinks, sudokuNavBarLinks };
