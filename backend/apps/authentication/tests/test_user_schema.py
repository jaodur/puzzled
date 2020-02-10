import json
from graphene_django.utils.testing import GraphQLTestCase
from .fixtures import (
    create_user_mutation,
    create_user_invalid_email_mutation,
    check_login_mutation,
    login_user_mutation,
    profiles_query,
    single_profile_query,
    update_profile_mutation,
)
from backend.schema import schema


class TestUserSchema(GraphQLTestCase):
    GRAPHQL_SCHEMA = schema

    def login_user(self, email='testemail@example.com'):

        # create user
        self.query(create_user_mutation(email=email))

        # login user
        self.query(login_user_mutation(email=email))

    def test_user_creation_with_valid_data_succeeds(self):
        response = self.query(create_user_mutation())

        self.assertResponseNoErrors(response)
        self.assertEquals(response.status_code, 200)

    def test_user_login_with_valid_data_succeeds(self):
        email = 'testemail@example.com'

        # create user
        self.query(create_user_mutation(email=email))

        response = self.query(login_user_mutation(email=email))

        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseNoErrors(response)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response_content['data']['loginUser']['user']['email'], email)

    def test_user_login_with_invalid_data_fails(self):
        email = 'testemail@example.com'

        # create user
        self.query(create_user_mutation())

        response = self.query(login_user_mutation(email=email))

        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseHasErrors(response)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response_content['errors'][0]['message'], "Invalid email or password")

    def test_user_creation_with_duplicate_email_fails(self):
        # Initial user creation
        self.query(create_user_mutation())
        response = self.query(create_user_mutation())

        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseHasErrors(response)
        self.assertEquals(response_content['errors'][0]['field'], 'email')
        self.assertEquals(response_content['errors'][0]['message'], "User with ['email'] already exists")

    def test_user_creation_with_invalid_email_fails(self):
        response = self.query(create_user_invalid_email_mutation())

        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseHasErrors(response)
        self.assertEquals(response_content['errors'][0]['field'], 'email')
        self.assertEquals(response_content['errors'][0]['message'], 'Enter a valid email address')

    def test_check_user_login_for_authenticated_user_succeeds(self):
        email = 'testemail@example.com'

        # create user
        self.query(create_user_mutation(email=email))

        # login user
        self.query(login_user_mutation(email=email))

        response = self.query(check_login_mutation())

        response_content = json.loads(response.content.decode('utf-8'))

        self.assertEquals(response_content['data']['checkLogin']['loggedIn'], True)
        self.assertEquals(response_content['data']['checkLogin']['user']['email'], email)

    def test_check_user_login_returns_false_for_anonymous_user(self):
        response = self.query(check_login_mutation())

        response_content = json.loads(response.content.decode('utf-8'))

        self.assertEquals(response_content['data']['checkLogin']['loggedIn'], False)
        self.assertEquals(response_content['data']['checkLogin']['user'], None)

    def test_querying_all_profiles_succeeds(self):
        # create user
        self.query(create_user_mutation())

        response = self.query(profiles_query())

        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseNoErrors(response)
        self.assertEquals(len(response_content['data']['profiles']), 1)
        self.assertEquals(
            response_content['data']['profiles'][0]['telephone'],
            'You do not have the required permission to view this field'
        )

    def test_querying_single_user_succeeds(self):
        email = 'testemail@example.com'

        # create user
        self.query(create_user_mutation(email=email))

        # login user
        self.query(login_user_mutation(email=email))

        response = self.query(single_profile_query(email))

        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseNoErrors(response)
        self.assertEquals(response_content['data']['profile']['email'], email)

    def test_update_profile_succeeds(self):
        self.login_user()

        name = 'new test name'

        response = self.query(update_profile_mutation(name=name))

        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseNoErrors(response)
        self.assertEquals(response_content['data']['updateUser']['user']['name'], name)

    def test_update_profile_with_annonymous_user_fails(self):
        name = 'new test name'

        response = self.query(update_profile_mutation(name=name))

        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseHasErrors(response)
        self.assertEquals(response_content['errors'][0]['message'], 'User profile not found. Please login.')
