from graphene_django import DjangoObjectType
from .models import ChatChannel, Message


class ChatChannelModelType(DjangoObjectType):
    class Meta:
        model = ChatChannel


class MessageModelType(DjangoObjectType):
    class Meta:
        model = Message
