import json
from django.contrib.auth import get_user_model
from graphene_django.utils.testing import GraphQLTestCase
from .fixtures import (
    create_user_mutation,
    create_user_invalid_email_mutation,
    check_login_mutation,
    login_user_mutation,
    profiles_query,
    single_profile_query,
    update_profile_mutation,
    change_password_mutation,
    logout_mutation,
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

        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseNoErrors(response)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response_content['data']['createUser']['user']['password'], 'This is a write only field.')

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

    def test_update_profile_with_invalid_timezone_fails(self):
        self.login_user()

        response = self.query(update_profile_mutation(timezone='invalid_tz'))

        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseHasErrors(response)
        self.assertEquals(response_content['errors'][0]['message'], 'Unknown timezone')

    def test_update_profile_with_anonymous_user_fails(self):
        name = 'new test name'

        response = self.query(update_profile_mutation(name=name))

        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseHasErrors(response)
        self.assertEquals(response_content['errors'][0]['message'], 'User profile not found. Please login.')

    def test_change_password_succeeds(self):
        email = 'testemail2@example.com'
        self.login_user(email)

        response = self.query(change_password_mutation())

        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseNoErrors(response)
        self.assertEquals(response_content['data']['changePassword']['user']['email'], email)

    def test_change_password_with_invalid_password_fails(self):

        self.login_user()

        response = self.query(change_password_mutation(password='invalid_pass'))

        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseHasErrors(response)
        self.assertEquals(response_content['errors'][0]['message'], 'Invalid Password.')

    def test_logout_user_succeeds(self):

        self.login_user()

        response = self.query(logout_mutation())

        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseNoErrors(response)
        self.assertEquals(response_content['data']['logoutUser']['loggedIn'], False)
        self.assertEquals(response_content['data']['logoutUser']['user'], None)

    def test_verify_email_check_anonymous_user(self):
        # create user
        email = 'testemail2@example.com'
        self.query(create_user_mutation(email=email))

        user = get_user_model().objects.get(email=email)

        confirm_email_url = user.generate_email_confirmation_url(user.email)

        response = self.client.get(confirm_email_url)

        self.assertEquals(response.status_code, 302)
        self.assertEquals(response.url, '/u/sign-in/')

    def test_verify_email_checks_expired_links(self):

        expired_link = 'http://localhost:8000/verification/verify-email/eyJpZCI6MTEsIm5ld19lbW' \
                        'FpbCI6Im9kdXIuam9zZXBoQGFuZGVsYS5jb20ifQ:1j468X:QJfZRyFGApGhOJDs7TagGRof3xg/'
        response = self.client.get(expired_link)

        self.assertEquals(response.status_code, 200)
        self.assertIn(b'Your email confirmation link has expired. Please generate new link', response.content)

    def test_verify_email_checks_invalid_links(self):
        invalid_link = 'http://localhost:8000/verification/verify-email/invalid_eyJpZCI6MTEsIm5ld19lbW' \
                       'FpbCI6Im9kdXIuam9zZXBoQGFuZGVsYS5jb20ifQ:1j468X:QJfZRyFGApGhOJDs7TagGRof3xg/'
        response = self.client.get(invalid_link)

        self.assertEquals(response.status_code, 200)
        self.assertIn(b'This email confirmation link is invalid. Please try again.', response.content)

    def test_verify_email_with_authenticated_user_succeeds(self):

        email = 'testemail23@example.com'

        # login user
        self.login_user(email=email)

        user = get_user_model().objects.get(email=email)

        confirm_email_url = user.generate_email_confirmation_url(user.email)

        # Ensure to use the GraphQl test client self._client to avoid anonymous user redirects
        response = self._client.get(confirm_email_url)

        self.assertEquals(response.status_code, 302)
        self.assertEquals(response.url, '/')

    def test_verify_email_captures_changed_email(self):
        email = 'testemail23@example.com'

        # login user
        self.login_user(email=email)

        user = get_user_model().objects.get(email=email)

        confirm_email_url = user.generate_email_confirmation_url('anotherEmail@example.com')

        # Ensure to use the GraphQl test client self._client to avoid anonymous user redirects
        response = self._client.get(confirm_email_url)

        self.assertEquals(response.status_code, 200)
        self.assertIn(b'The email being verified changed. Please regenerate confirmation link', response.content)

    def test_verify_email_runs_on_anonymous_user_login(self):

        email = 'testEmail@example.com'

        # create user
        self.query(create_user_mutation(email=email))

        user = get_user_model().objects.get(email=email)

        confirm_email_url = user.generate_email_confirmation_url(user.email)

        # Ensure to use the GraphQl test client self._client to avoid anonymous user redirects
        verify_email_response = self._client.get(confirm_email_url)

        self.assertEquals(verify_email_response.status_code, 302)
        self.assertEquals(verify_email_response.url, '/u/sign-in/')
        self.assertIn('verify_email_data', self._client.session.keys())

        # login user
        login_response = self.query(login_user_mutation(email=email))

        response_content = json.loads(login_response.content.decode('utf-8'))

        self.assertEquals(login_response.status_code, 200)
        self.assertTrue(response_content['data']['loginUser']['user']['emailVerified'])
