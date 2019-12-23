from django.contrib.auth import get_user_model
import faker
import pytest

FAKE = faker.Faker()


@pytest.fixture(scope='module')
def user():
    return get_user_model()(
        name=FAKE.first_name(),
        preferred_name=FAKE.first_name(),
        email=FAKE.email()
    )


@pytest.fixture(scope='function')
def user_data():
    return {
        'first_name': FAKE.first_name(),
        'last_name': FAKE.last_name(),
        'email': FAKE.email(),
        'password': FAKE.password(),
        'picture_url': FAKE.url()
    }
