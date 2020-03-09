import graphene
from graphene_django import DjangoObjectType
from graphene_subscriptions.events import UPDATED

from .models import ChatChannel, Message


class ChatChannelModelType(DjangoObjectType):
    class Meta:
        model = ChatChannel


class MessageModelType(DjangoObjectType):
    class Meta:
        model = Message


class ChatSubscription(graphene.ObjectType):
    chat_channel_updated = graphene.Field(ChatChannelModelType, id=graphene.ID())

    def resolve_chat_channel_updated(self, root, info, instance_id):
        return root.filter(
            lambda event:
                event.operattion == UPDATED and isinstance(event.instance, ChatChannel) and event.instance.id == int(instance_id)
        ).map(lambda event: event.instance)

    # @classmethod
    # def Field(cls, *args, **kwargs):
    #     kwargs.update({'description': 'Subscription for {} model'})
    #     return graphene.Field(cls, args=cls._meta.arguments, resolver=cls.resolve_chat_channel_updated, **kwargs)


# class ChannelSubscription(Subscription):
#
#     class Meta:
#         serializer_class = ChannelSerializer
#         stream = 'channels'
#         description = 'Channel Subscription'
#
#
# class MessageSubscription(Subscription):
#
#     class Meta:
#         serializer_class = MessageSerializer
#         stream = 'messages'
#         description = 'Message Subscription'
