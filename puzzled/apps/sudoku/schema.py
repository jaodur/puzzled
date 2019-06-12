import graphene
from .game_logic import Sudoku


class SolveSudoku(graphene.Mutation):
    puzzle = graphene.List(graphene.List(graphene.Int))
    p_type = graphene.Int()

    class Arguments:
        puzzle = graphene.List(graphene.List(graphene.Int))
        p_type = graphene.Int()

    def mutate(self, info, puzzle, p_type):
        sudoku = Sudoku(puzzle=puzzle, type=p_type).solve()

        return SolveSudoku(puzzle=sudoku.puzzle, p_type=p_type)


class Mutation(graphene.ObjectType):
    solve_sudoku = SolveSudoku.Field()

