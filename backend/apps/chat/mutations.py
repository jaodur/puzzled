import uuid
import graphene
from django.db.utils import IntegrityError
from django.contrib.auth import get_user_model
from backend.lib.base import BaseMutation
from backend.lib.types import Error
from backend.lib.decorators.permissions import is_authenticated
from backend.lib.exceptions import FieldValidationError
from backend.lib.validators import chat_type_validator, get_invalid_model_unique_keys, ChatTypeEnum
from .model_types import ChatChannel, ChatChannelModelType


def generate_room_id(user_ids=(), non_reusable=False):
    if non_reusable:
        return str(uuid.uuid1())
    return hash(''.join(sorted(set(user_ids))))


class CreateOrGetDirectChatChannelMutation(BaseMutation):
    chat_channel = graphene.Field(ChatChannelModelType)

    class Meta:
        description = 'Create or get Direct Chat Channels'
        error_type_class = Error
        error_type_field = "create_or_get_chat_channel_errors"
        model = ChatChannel

    class Arguments:
        user_ids = graphene.List(graphene.NonNull(graphene.String), required=True)
        name = graphene.String(required=False)

    @classmethod
    @is_authenticated
    def perform_mutation(cls, info, user_ids, name=generate_room_id(non_reusable=True)):
        chat_room_id = generate_room_id(user_ids)
        chat_channel = ChatChannel.objects.filter(room_id=chat_room_id).first()

        if not chat_channel:
            invalid_user_ids = get_invalid_model_unique_keys(get_user_model(), user_ids)

            if invalid_user_ids:
                raise FieldValidationError(
                    field='user_ids',
                    message=f'user(s) with ids {invalid_user_ids} not found',
                    code='invalid',
                    params=user_ids
                )

            try:
                chat_channel = ChatChannel(
                    room_id=chat_room_id,
                    name=name,
                    type=ChatTypeEnum.DIRECT
                )

                chat_channel.save()
            except IntegrityError:
                raise FieldValidationError(
                    field='name',
                    message=f"ChatChannel with name '{name}' already exists",
                    code='invalid',
                    params=name
                )
            chat_channel.users.set(user_ids)

        return CreateOrGetDirectChatChannelMutation(chat_channel=chat_channel)


class CreateOrGetMultiUserChatChannelMutation(BaseMutation):

    chat_channel = graphene.Field(ChatChannelModelType)

    class Meta:
        description = 'Create or get Private/Public Chat Channels'
        error_type_class = Error
        error_type_field = "create_or_get_multi_user_chat_channel_errors"
        model = ChatChannel

    class Arguments:
        user_ids = graphene.List(graphene.NonNull(graphene.String), required=False)
        name = graphene.String(required=True)
        chat_type = graphene.String(required=True)

    class Validators:
        chat_type = chat_type_validator

    @classmethod
    @is_authenticated
    def perform_mutation(cls, info, name, chat_type, user_ids=()):

        chat_channel = ChatChannel.objects.filter(name=name).first()

        if not chat_channel:
            if chat_type == ChatTypeEnum.DIRECT.value:
                raise FieldValidationError(
                    field='chat_type',
                    message='This mutation is only used to create Private or Public chat channels',
                    code='invalid',
                    params=chat_type
                )

            invalid_user_ids = get_invalid_model_unique_keys(get_user_model(), user_ids)

            if invalid_user_ids:
                raise FieldValidationError(
                    field='user_ids',
                    message=f'user(s) with ids {invalid_user_ids} not found',
                    code='invalid',
                    params=user_ids
                )
            try:
                chat_channel = ChatChannel(room_id=generate_room_id(non_reusable=True), name=name, type=chat_type)
                chat_channel.save()

            except IntegrityError:
                raise FieldValidationError(
                    field='name',
                    message=f"ChatChannel with name '{name}' already exists",
                    code='invalid',
                    params=name
                )

            chat_channel.users.set(user_ids)

        return CreateOrGetDirectChatChannelMutation(chat_channel=chat_channel)
