import graphene
from backend.apps.sudoku.schema import SudokuMutation, SudokuQuery
from backend.apps.authentication.schema import UserMutation, UserQuery
from backend.apps.chat.schema import ChatSubscriptions


class Mutation(UserMutation, SudokuMutation, graphene.ObjectType):
    pass


class Query(UserQuery, SudokuQuery, graphene.ObjectType):
    pass


class Subscription(ChatSubscriptions, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation, subscription=Subscription)
