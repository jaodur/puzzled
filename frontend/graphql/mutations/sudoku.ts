import gql from 'graphql-tag';

const SOLVE_SUDOKU_MUTATION = gql`
    mutation solveSudoku($puzzle: [[Int]]!, $pType: Int!) {
        solveSudoku(puzzle: $puzzle, pType: $pType) {
            pType
            puzzle
        }
    }
`;

const GENERATE_SUDOKU_MUTATION = gql`
    mutation generateSudoku($pType: Int!, $difficulty: String!) {
        generateSudoku(pType: $pType, difficulty: $difficulty) {
            pType
            difficulty
            puzzle
        }
    }
`;

export { SOLVE_SUDOKU_MUTATION, GENERATE_SUDOKU_MUTATION };
