import graphene
from graphene_django import DjangoObjectType
from .models import ChatChannel, Message


class MessageModelType(DjangoObjectType):
    class Meta:
        model = Message

    float = graphene.String()

    def resolve_float(self, info):
        return 'right' if self.user == info.context.user else 'left'


class ChatChannelModelType(DjangoObjectType):
    class Meta:
        model = ChatChannel

    latest_message = graphene.Field(MessageModelType)

    def resolve_latest_message(self, info):
        return self.messages.last()
