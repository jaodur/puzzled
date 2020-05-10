import graphene
from graphene_django import DjangoObjectType
from .models import ChatChannel, Message


class MessageModelType(DjangoObjectType):
    class Meta:
        model = Message

    float = graphene.String()

    def resolve_float(self, info):
        if self.user == info.context.user:
            return 'right'
        return 'left'


class ChatChannelModelType(DjangoObjectType):
    class Meta:
        model = ChatChannel

    latest_message = graphene.Field(MessageModelType)

    def resolve_latest_message(self, info):
        return self.messages.last()
