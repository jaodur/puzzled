import graphene
from .mutations import CreateOrGetChatChannelMutation
from .subscriptions import ChatChannelSubscription


class ChatSubscriptions(graphene.ObjectType):
    chat_channel_subscription = ChatChannelSubscription.Field()


class ChatMutations(graphene.ObjectType):
    create_or_get_chat_channel = CreateOrGetChatChannelMutation.Field()
