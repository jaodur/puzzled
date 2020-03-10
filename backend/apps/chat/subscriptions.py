import graphene
from graphene_django import DjangoObjectType
from graphene_subscriptions.events import UPDATED
from backend.lib.base.base_subscription import BaseSubscription

from .models import ChatChannel, Message


class ChatChannelModelType(DjangoObjectType):
    class Meta:
        model = ChatChannel


class MessageModelType(DjangoObjectType):
    class Meta:
        model = Message


class ChatChannelSubscription(BaseSubscription):

    chat_channel_updated = graphene.Field(ChatChannelModelType, id=graphene.ID())

    class Meta:
        model = ChatChannel
        actions = [UPDATED]
        description = 'ChatChannel Subscription'

    class Arguments:
        instance_id = graphene.String(required=True)
