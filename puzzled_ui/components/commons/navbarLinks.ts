import {navbarInterface} from "../interfaces";
let linkNoStyle: string = 'link__no-style';

let defaultNavBarLinks: navbarInterface = {
    primaryLabel: { text: 'puzzled', href: '/', style: linkNoStyle },
    secLabel: { text: null, href: '#' },
    links:
        [
            { name: 'Games', href: '#' },
            { name: 'Pin', href: '#' },
            { name: null, href: null, linkClass: 'navbar-separator' },
            { name: 'Sign In', href: '#' },
            { name: 'Sign Up', href: '#' }

        ]
};

let sudokuNavBarLinks: navbarInterface = {
    primaryLabel: { text: 'puzzled', href: "/", style: linkNoStyle },
    secLabel: { text: 'sudoku', href: '/sudoku/', style: linkNoStyle },
    links:
        [
            { name: 'Play', href: '#' },
            { name: 'Solve', href: '#' },
            { name: 'About Sudoku', href: '#' },
            { name: null, href: null, linkClass: 'navbar-separator' },
            { name: 'Sign In', href: '#' },
            { name: 'Sign Up', href: '#' },

        ]
};

export { defaultNavBarLinks, sudokuNavBarLinks }
