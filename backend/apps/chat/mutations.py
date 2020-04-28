import graphene
from backend.lib.base import BaseMutation
from backend.lib.types import Error
from backend.lib.decorators.permissions import is_authenticated
from backend.lib.validators import chat_type_validator
from .model_types import ChatChannel, ChatChannelModelType


class CreateOrGetChatChannelMutation(BaseMutation):
    chat_channel = graphene.Field(ChatChannelModelType)

    class Meta:
        description = 'Create or get Chat Channels'
        error_type_class = Error
        error_type_field = "create_or_get_chat_channel_errors"
        model = ChatChannel

    class Arguments:
        user_ids = graphene.List(graphene.NonNull(graphene.String), required=True)
        name = graphene.String(required=True)
        chat_type = graphene.String(required=True)

    class Validators:
        chat_type = chat_type_validator

    @classmethod
    @is_authenticated
    def perform_mutation(cls, info, name, chat_type, user_ids):
        chat_room_id = hash(''.join(set(user_ids)))
        chat_channel = ChatChannel.objects.filter(room_id=chat_room_id).first()

        if not chat_channel:
            chat_channel = ChatChannel(room_id=chat_room_id, name=name, type=chat_type)
            chat_channel.save()
            chat_channel.users.set(user_ids)

        return CreateOrGetChatChannelMutation(chat_channel=chat_channel)
