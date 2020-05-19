import graphene
from backend.sudoku.schema import SudokuMutation, SudokuQuery
from backend.authentication.schema import UserMutation, UserQuery
from backend.chat.schema import ChatMutations, ChatSubscriptions


class Mutation(UserMutation, SudokuMutation, ChatMutations, graphene.ObjectType):
    pass


class Query(UserQuery, SudokuQuery, graphene.ObjectType):
    pass


class Subscription(ChatSubscriptions, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation, subscription=Subscription)
