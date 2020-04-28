import graphene
from graphene_subscriptions.events import UPDATED
from backend.lib.base.base_subscription import BaseSubscription

from .models import ChatChannel
from .model_types import ChatChannelModelType


class ChatChannelSubscription(BaseSubscription):

    chat_channel_updated = graphene.Field(ChatChannelModelType, id=graphene.ID())

    class Meta:
        model = ChatChannel
        actions = [UPDATED]
        description = 'ChatChannel Subscription'

    class Arguments:
        instance_id = graphene.String(required=True)
