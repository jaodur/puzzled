import * as React from "react";
import { Fragment } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

export const SOLVE_SUDOKU_MUTATION = gql`
  mutation solveSudoku($puzzle: [[Int]]!, $pType: Int!) {
      solveSudoku(puzzle: $puzzle, pType: $pType){
        pType
        puzzle
      }
  }
`;

export default function() {

    return (
        <Mutation mutation={SOLVE_SUDOKU_MUTATION}>

            {(solveSudoku: any) => (
                <Fragment>
                    <h1>React TypeScript Apollo!</h1>
                    <button
                        onClick = {(e) => {
                            e.preventDefault();
                        solveSudoku({
                                variables: {
                                    puzzle:[[9,8,4, 0,0,0, 5,0,1],
                                        [0,0,0, 5,0,0, 0,0,7],
                                        [0,0,0, 0,0,0, 0,0,9],

                                        [0,0,0, 0,1,0, 0,0,0],
                                        [0,2,0, 7,0,3, 1,0,0],
                                        [5,6,0, 0,0,0, 0,0,0],

                                        [8,0,0, 0,0,0, 4,9,6],
                                        [0,0,0, 0,9,0, 0,0,0],
                                        [1,0,0, 2,8,0, 0,0,0]],
                                    pType:3

                                }
                            }).then((res:any) => {
                               console.log('response', res);
                               alert('test successful, check console terminal for response from server');
                        });


                    }}
                        >test button
                    </button>
                </Fragment>

            )}
        </Mutation>
    )

}
