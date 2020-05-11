import json
from graphene_django.utils.testing import GraphQLTestCase
from backend.apps.authentication.tests.fixtures import create_user_mutation, login_user_mutation
from .fixtures import create_direct_chat_mutation, create_multi_user_chat_mutation
from backend.schema import schema


class TestChatSchema(GraphQLTestCase):
    GRAPHQL_SCHEMA = schema

    def login_user(self, email='testemail@example.com'):

        # create user1
        resp1 = self.query(create_user_mutation(email=email))
        resp1 = json.loads(resp1.content.decode('utf-8'))

        # create user2
        resp2 = self.query(create_user_mutation(email='testemail2@example.com'))
        resp2 = json.loads(resp2.content.decode('utf-8'))

        # create user3
        resp3 = self.query(create_user_mutation(email='testemail3@example.com'))
        resp3 = json.loads(resp3.content.decode('utf-8'))

        # login user1
        self.query(login_user_mutation(email=email))

        id1 = resp1['data']['createUser']['user']['id']
        id2 = resp2['data']['createUser']['user']['id']
        id3 = resp3['data']['createUser']['user']['id']

        return id1, id2, id3

    def test_direct_chat_creation_with_valid_data_succeeds(self):
        user_ids = self.login_user()

        response = self.query(create_direct_chat_mutation(user_ids[0], user_ids[1]))
        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseNoErrors(response)
        self.assertIn(response_content['data']['createOrGetDirectChat']['chatChannel']['users'][0]['id'], user_ids)

    def test_direct_chat_creation_with_invalid_user_ids_fails(self):
        self.login_user()
        invalid_user_ids = [1, 2000]

        response = self.query(create_direct_chat_mutation(invalid_user_ids[0], invalid_user_ids[1]))
        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseHasErrors(response)
        self.assertEquals(response_content['errors'][0]['field'], 'userIds')
        self.assertEquals(response_content['errors'][0]['code'], 'invalid')
        self.assertEquals(response_content['errors'][0]['message'], "user(s) with ids ['1', '2000'] not found")

    def test_direct_chat_creation_with_invalid_name_fails(self):
        user_ids = self.login_user()
        another_name = "anotherName"

        self.query(create_direct_chat_mutation(user_ids[0], user_ids[1], name=another_name))
        response = self.query(create_direct_chat_mutation(user_ids[0], user_ids[2], name=another_name))
        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseHasErrors(response)
        self.assertEquals(response_content['errors'][0]['field'], 'name')
        self.assertEquals(response_content['errors'][0]['code'], 'invalid')
        self.assertEquals(response_content['errors'][0]['message'],
                          f"ChatChannel with name '{another_name}' already exists")

    def test_multi_user_chat_creation_with_valid_data_succeeds(self):
        user_ids = self.login_user()

        response = self.query(create_multi_user_chat_mutation('public_chat', 'Public', user_ids))
        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseNoErrors(response)
        self.assertIn(response_content['data']['createOrGetMultiUserChat']['chatChannel']['users'][0]['id'], user_ids)

    def test_multi_user_chat_creation_with_invalid_type_fails(self):
        user_ids = self.login_user()

        response = self.query(create_multi_user_chat_mutation('public_chat', 'Invalid', user_ids))
        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseHasErrors(response)
        self.assertEquals(response_content['errors'][0]['field'], 'chatType')
        self.assertEquals(response_content['errors'][0]['code'], 'Invalid')
        self.assertEquals(
            response_content['errors'][0]['message'],
            "Invalid chatType. Possible types are ['Public', 'Private', 'Direct']")

    def test_multi_user_chat_creation_with_invalid_user_id_fails(self):
        self.login_user()

        response = self.query(create_multi_user_chat_mutation('public_chat', 'Public', [1, 2000]))
        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseHasErrors(response)
        self.assertEquals(response_content['errors'][0]['field'], 'userIds')
        self.assertEquals(response_content['errors'][0]['code'], 'invalid')
        self.assertEquals(response_content['errors'][0]['message'], "user(s) with ids ['1', '2000'] not found")

