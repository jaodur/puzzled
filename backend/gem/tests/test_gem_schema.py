import json
from graphene_django.utils.testing import GraphQLTestCase
from backend.authentication.tests.fixtures import create_user_mutation, login_user_mutation, logout_mutation
from backend.schema import schema
from .fixtures import gem_query


class TestGemSchema(GraphQLTestCase):
    GRAPHQL_SCHEMA = schema

    def login_user(self, email='testemail@example.com'):
        email2 = 'testemail2@example.com'

        # create user1
        resp1 = self.query(create_user_mutation(email=email))
        resp1 = json.loads(resp1.content.decode('utf-8'))

        # create user2
        resp2 = self.query(create_user_mutation(email=email2))
        resp2 = json.loads(resp2.content.decode('utf-8'))

        # login user1
        self.query(login_user_mutation(email=email))

        id1 = resp1['data']['createUser']['user']['id']
        id2 = resp2['data']['createUser']['user']['id']

        return id1, id2

    def test_gem_creation_succeeds(self):
        user_ids = self.login_user()

        response = self.query(gem_query(user_ids[0]))
        response_content = json.loads(response.content.decode('utf-8'))
        self.assertResponseNoErrors(response)
        self.assertEquals(response_content['data']['gem']['gems'], 0)
        self.assertEquals(response_content['data']['gem']['user']['id'], user_ids[0])

    def test_non_owner_request_rejected(self):
        user_ids = self.login_user()

        response = self.query(gem_query(user_ids[1]))
        response_content = json.loads(response.content.decode('utf-8'))
        self.assertResponseHasErrors(response)
        self.assertEquals(
            response_content['errors'][0]['message'],
            'You do not have the required permission to view this field'
        )
