from django.contrib.auth import get_user_model
import graphene
from graphene_django import DjangoObjectType


class CreateUserType(DjangoObjectType):
    class Meta:
        model = get_user_model()

    def resolve_password(self, info):
        return 'This is a write only field.'


class CreateUserMutation(graphene.Mutation):
    user = graphene.Field(CreateUserType)

    class Arguments:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, first_name, last_name, email, password):
        user = get_user_model().objects.create_user(
            first_name=first_name, last_name=last_name, email=email, password=password
        )

        return CreateUserMutation(user=user)


class UserMutation(graphene.ObjectType):
    create_user = CreateUserMutation.Field()

