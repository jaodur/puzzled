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
        'email': 'test@exmaple.com',
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
                    emailVerified,
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
                    user {
                        email
                    }
                }
            }
        '''
    )


def profiles_query():
    return (
        '''
            query {
                profiles {
                    name
                    preferredName
                    telephone
                    email
                }
            }
        '''
    )


def single_profile_query(email):
    return (
        f'''
            query {{
                profile(email: "{email}") {{
                    name
                    preferredName
                    telephone
                    email
                }}
            }}
        '''
    )


def update_profile_mutation(name='test name', preferred_name='test preferred name', timezone='Africa_Kampala'):
    return (
        f'''
        mutation {{
            updateUser(name: "{name}", preferredName: "{preferred_name}", timezone: "{timezone}"){{
                user{{
                    id,
                    name,
                    email,
                }}
            }}
        }}
        '''
    )


def change_password_mutation(password='test1234', new_password='123456'):
    return (
        f'''
        mutation {{
            changePassword(password: "{password}", newPassword: "{new_password}"){{
                user{{
                    id,
                    name,
                    email,
                }}
            }}
        }}
        '''
    )


def logout_mutation():
    return (
        '''
        mutation {
            logoutUser {
                loggedIn
                user {
                    id,
                    name,
                    email,
                }
            }
        }
        '''
    )
