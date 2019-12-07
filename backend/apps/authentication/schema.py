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
        preferred_name = graphene.String(required=False)
        telephone = graphene.String(required=False)
        picture_url = graphene.String(required=False)

    def mutate(self, info, first_name, last_name, email, password, **optional_fields):

        user = get_user_model().objects.create_user(
            first_name=first_name, last_name=last_name, email=email, password=password, **optional_fields
        )

        return CreateUserMutation(user=user)


class UserMutation(graphene.ObjectType):
    create_user = CreateUserMutation.Field()
