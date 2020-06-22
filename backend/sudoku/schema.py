import graphene
from graphene_django import DjangoObjectType
from .game_logic import Sudoku
from .models import Sudoku as SudokuModel


class SudokuType(DjangoObjectType):
    class Meta:
        model = SudokuModel


class SudokuQuery(graphene.ObjectType):
    sodukus = graphene.List(SudokuType)

    def resolve_sudokus(self, info, **kwargs):
        return SudokuModel.objects.all()


class SolveSudokuMutation(graphene.Mutation):
    puzzle = graphene.List(graphene.List(graphene.Int))
    p_type = graphene.Int()

    class Arguments:
        puzzle = graphene.List(graphene.List(graphene.Int))
        p_type = graphene.Int()

    def mutate(self, info, puzzle, p_type):
        sudoku = Sudoku(puzzle=puzzle, type=p_type).solve()

        return SolveSudokuMutation(puzzle=sudoku.puzzle, p_type=p_type)


class GenerateSudokuMutation(graphene.Mutation):
    puzzle = graphene.List(graphene.List(graphene.Int))
    difficulty = graphene.String()
    p_type = graphene.Int()

    class Arguments:
        difficulty = graphene.String()
        p_type = graphene.Int()

    def mutate(self, info, difficulty, p_type):
        sudoku = Sudoku.generate(puzzle_type=p_type, difficulty=difficulty)
        return GenerateSudokuMutation(puzzle=sudoku.puzzle, difficulty=difficulty, p_type=p_type)


class SudokuMutation(graphene.ObjectType):
    solve_sudoku = SolveSudokuMutation.Field()
    generate_sudoku = GenerateSudokuMutation.Field()
