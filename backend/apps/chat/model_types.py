import graphene
from graphene_django import DjangoObjectType
from .models import ChatChannel, Message


class ChatChannelModelType(DjangoObjectType):
    class Meta:
        model = ChatChannel


class MessageModelType(DjangoObjectType):
    class Meta:
        model = Message

    float = graphene.String()

    def resolve_float(self, info):
        if self.user == info.context.user:
            return 'right'
        return 'left'
