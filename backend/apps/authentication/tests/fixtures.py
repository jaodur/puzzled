from django.contrib.auth import get_user_model
import faker
from graphene.test import Client
from backend.schema import schema
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


def create_user_mutation(first_name="test", last_name="test", email="test@example.com", password="test1234"):
    return (
        f'''
        mutation {{
            createUser(firstName: "{first_name}", lastName: "{last_name}", email: "{email}", password: "{password}"){{
                user{{
                    id,
                    name,
                    email
                }}
            }}
        }}
        '''
    )


def login_user_mutation(email=FAKE.email(), password='test1234'):
    return (
        f'''
        mutation {{
            loginUser(email: "{email}", password: "{password}"){{
                user{{
                    id,
                    name,
                    email,
                }}
                loggedIn
            }}
        }}
        '''
    )


def create_user_invalid_email_mutation():
    return (
        '''
        mutation {
            createUser(firstName:"test", lastName: "test", email:"invalid_email", password: "test1234"){
                user{
                    id,
                    name,
                    email
                }
            }
        }
        '''
    )


def check_login_mutation():
    return (
        '''
            mutation checkLogin {
                checkLogin {
                    loggedIn
                    email
                }
            }
        '''
    )
