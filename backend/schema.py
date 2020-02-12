import graphene
from backend.apps.sudoku.schema import SudokuMutation, SudokuQuery
from backend.apps.authentication.schema import UserMutation, UserQuery


class Mutation(UserMutation, SudokuMutation, graphene.ObjectType):
    pass


class Query(UserQuery, SudokuQuery, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
