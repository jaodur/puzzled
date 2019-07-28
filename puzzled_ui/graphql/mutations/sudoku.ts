import gql from 'graphql-tag';

const SOLVE_SUDOKU_MUTATION = gql`
  mutation solveSudoku($puzzle: [[Int]]!, $pType: Int!) {
      solveSudoku(puzzle: $puzzle, pType: $pType){
        pType
        puzzle
      }
  }
`;

export { SOLVE_SUDOKU_MUTATION }
