from graphene_django_subscriptions.subscription import Subscription
from .serializers import ChannelSerializer, MessageSerializer


class ChannelSubscription(Subscription):

    class Meta:
        serializer_class = ChannelSerializer
        stream = 'channels'
        description = 'Channel Subscription'


class MessageSubscription(Subscription):

    class Meta:
        serializer_class = MessageSerializer
        stream = 'messages'
        description = 'Message Subscription'
