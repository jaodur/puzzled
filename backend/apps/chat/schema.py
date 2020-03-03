import graphene
from .subscriptions import ChannelSubscription, MessageSubscription


class ChatSubscriptions(graphene.ObjectType):
    channel_subscription = ChannelSubscription.Field()
    message_subscription = MessageSubscription.Field()
