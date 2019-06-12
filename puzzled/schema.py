import graphene
from puzzled.apps.sudoku.schema import Mutation as SudokuMutation


class Mutation(SudokuMutation, graphene.ObjectType):
    pass


class Query(graphene.ObjectType):
    pass


schema = graphene.Schema(mutation=Mutation)
