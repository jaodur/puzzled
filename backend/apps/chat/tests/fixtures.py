from django.contrib.auth import get_user_model
import faker
# from graphene.test import Client
# from backend.schema import schema
import pytest

from backend.apps.chat.models import Message, ChatChannel

FAKE = faker.Faker()


@pytest.fixture(scope='module')
def user():
    return get_user_model()(
        name=FAKE.first_name(),
        preferred_name=FAKE.first_name(),
        email=FAKE.email()
    )


@pytest.fixture(scope='module')
def channel():
    return ChatChannel(
        room_id='djfhkf,mnskjnsllksfklnfdluns',
        name='testname',
        type='Private'
    )


@pytest.fixture(scope='module')
def message(user):
    return Message(
        user=user,
        message=FAKE.sentence()
    )
