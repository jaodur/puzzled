import graphene
from backend.apps.sudoku.schema import SudokuMutation, SudokuQuery
from backend.apps.authentication.schema import UserMutation


class Mutation(UserMutation, SudokuMutation, graphene.ObjectType):
    pass


class Query(SudokuQuery, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
