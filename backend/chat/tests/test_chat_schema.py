import json
from unittest.mock import patch
from graphene_django.utils.testing import GraphQLTestCase
from backend.authentication.tests.fixtures import create_user_mutation, login_user_mutation, logout_mutation
from .fixtures import (
    add_message_mutation,
    edit_message_mutation,
    create_direct_chat_mutation,
    create_multi_user_chat_mutation
)
from backend.schema import schema


class MockChatChannel:
    messages = set()


class MockChatChannelQuerySet:
    objects = {'1': MockChatChannel()}


class TestChatSchema(GraphQLTestCase):
    GRAPHQL_SCHEMA = schema

    def login_user(self, email='testemail@example.com'):
        email2 = 'testemail2@example.com'

        # create user1
        resp1 = self.query(create_user_mutation(email=email))
        resp1 = json.loads(resp1.content.decode('utf-8'))

        # create user2
        resp2 = self.query(create_user_mutation(email=email2))
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

    def test_multi_user_chat_creation_with_direct_chat_type_fails(self):
        user_ids = self.login_user()

        response = self.query(create_multi_user_chat_mutation('public_chat', 'Direct', user_ids))
        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseHasErrors(response)
        self.assertEquals(response_content['errors'][0]['field'], 'chatType')
        self.assertEquals(response_content['errors'][0]['code'], 'invalid')
        self.assertEquals(
            response_content['errors'][0]['message'],
            'This mutation is only used to create Private or Public chat channels')

    def test_multi_user_chat_creation_with_invalid_user_id_fails(self):
        self.login_user()

        response = self.query(create_multi_user_chat_mutation('public_chat', 'Public', [1, 2000]))
        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseHasErrors(response)
        self.assertEquals(response_content['errors'][0]['field'], 'userIds')
        self.assertEquals(response_content['errors'][0]['code'], 'invalid')
        self.assertEquals(response_content['errors'][0]['message'], "user(s) with ids ['1', '2000'] not found")

    @patch('backend.chat.mutations.ChatChannel')
    def test_add_message_to_channel_succeeds(self, mock_chat_channel):

        mock_chat_channel.return_value = MockChatChannelQuerySet

        user_ids = self.login_user()

        test_message = 'test message'

        response = self.query(add_message_mutation('1', test_message))
        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseNoErrors(response)
        self.assertEquals(response_content['data']['addMessage']['chatMessage']['message'], test_message)
        self.assertEquals(response_content['data']['addMessage']['chatMessage']['float'], 'right')
        self.assertEquals(response_content['data']['addMessage']['chatMessage']['user']['id'], user_ids[0])

    def test_add_message_to_invalid_channel_id_fails(self):
        self.login_user()

        test_message = 'test message'
        invalid_channel_id = '1000'

        response = self.query(add_message_mutation(invalid_channel_id, test_message))
        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseHasErrors(response)
        self.assertEquals(response_content['errors'][0]['field'], 'channelId')
        self.assertEquals(response_content['errors'][0]['code'], 'invalid')
        self.assertEquals(response_content['errors'][0]['message'], f'channel with id {invalid_channel_id} not found')

    @patch('backend.chat.mutations.ChatChannel')
    def test_edit_message_succeeds(self, mock_chat_channel):
        mock_chat_channel.return_value = MockChatChannelQuerySet
        user_ids = self.login_user()

        test_message = 'test message'
        edited_message = 'test message edited'

        response = self.query(add_message_mutation('1', test_message))
        response_content = json.loads(response.content.decode('utf-8'))

        message_id = response_content['data']['addMessage']['chatMessage']['id']

        response = self.query(edit_message_mutation(message_id, edited_message))

        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseNoErrors(response)
        self.assertEquals(response_content['data']['editMessage']['chatMessage']['message'], edited_message)
        self.assertEquals(response_content['data']['editMessage']['chatMessage']['float'], 'right')
        self.assertEquals(response_content['data']['editMessage']['chatMessage']['user']['id'], user_ids[0])

    def test_edit_message_invalid_id_fails(self):
        self.login_user()

        edited_message = 'test message edited'
        invalid_message_id = '2000'
        response = self.query(edit_message_mutation(invalid_message_id, edited_message))

        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseHasErrors(response)
        self.assertEquals(response_content['errors'][0]['field'], 'messageId')
        self.assertEquals(response_content['errors'][0]['code'], 'invalid')
        self.assertEquals(response_content['errors'][0]['message'], f'message with id {invalid_message_id} not found')

    @patch('backend.chat.mutations.ChatChannel')
    def test_edit_message_by_another_fails(self, mock_chat_channel):
        mock_chat_channel.return_value = MockChatChannelQuerySet
        self.login_user()

        test_message = 'test message'
        edited_message = 'test message edited'

        response = self.query(add_message_mutation('1', test_message))
        response_content = json.loads(response.content.decode('utf-8'))

        message_id = response_content['data']['addMessage']['chatMessage']['id']

        self.query(logout_mutation())
        self.query(login_user_mutation(email='testemail2@example.com'))

        response = self.query(edit_message_mutation(message_id, edited_message))

        response_content = json.loads(response.content.decode('utf-8'))

        self.assertResponseHasErrors(response)
        self.assertEquals(response_content['errors'][0]['field'], None)
        self.assertEquals(response_content['errors'][0]['code'], 'invalid')
        self.assertEquals(response_content['errors'][0]['message'], 'Permission Denied')
