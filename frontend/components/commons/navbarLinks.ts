import { NavbarInterface } from '../interfaces';
const linkNoStyle: string = 'link__no-style';

const defaultNavBarLinks: NavbarInterface = {
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

const sudokuNavBarLinks: NavbarInterface = {
    primaryLabel: { text: 'puzzled', href: '/', style: linkNoStyle },
    secLabel: { text: 'sudoku', href: '/sudoku/', style: linkNoStyle },
    links: [
        { name: 'Play', href: '/sudoku/play/' },
        { name: 'Solve', href: '/sudoku/solve/' },
        { name: 'Trainer', href: '/sudoku/trainer/' },
        { name: 'Help', href: '#' },
        { name: null, href: '#', linkClass: 'navbar-separator' },
        { name: 'Sign In', href: '#' },
        { name: 'Sign Up', href: '#' },
    ],
};

export { defaultNavBarLinks, sudokuNavBarLinks };
