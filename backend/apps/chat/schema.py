import graphene
from .subscriptions import ChatChannelSubscription


class ChatSubscriptions(graphene.ObjectType):
    chat_channel_subscription = ChatChannelSubscription.Field()
