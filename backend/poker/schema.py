import graphene
from .mutations import AddPokerPlayer, CreatePokerRoom


class PokerMutations(graphene.ObjectType):
    add_poker_player = AddPokerPlayer.Field()
    create_poker_room = CreatePokerRoom.Field()
