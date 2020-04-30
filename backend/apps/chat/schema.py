import graphene
from .mutations import AddMessage, CreateOrGetDirectChatChannelMutation, CreateOrGetMultiUserChatChannelMutation
from .subscriptions import ChatChannelSubscription


class ChatSubscriptions(graphene.ObjectType):
    chat_channel_subscription = ChatChannelSubscription.Field()


class ChatMutations(graphene.ObjectType):
    create_or_get_direct_chat = CreateOrGetDirectChatChannelMutation.Field()
    create_or_get_multi_user_chat = CreateOrGetMultiUserChatChannelMutation.Field()
    add_message = AddMessage.Field()
