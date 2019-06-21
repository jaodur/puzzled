import graphene
from puzzled.apps.sudoku.schema import Mutation as SudokuMutation, Query as SudokuQuery


class Mutation(SudokuMutation, graphene.ObjectType):
    pass


class Query(SudokuQuery, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
