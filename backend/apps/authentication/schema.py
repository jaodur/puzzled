from django.contrib.auth import authenticate, get_user_model, login, logout
import graphene
from graphene_django import DjangoObjectType
from backend.lib.base import BaseMutation
from backend.lib.validators import email_validator, url_validator
from backend.lib.types import Error
from backend.lib.decorators.permissions import is_owner, is_authenticated
from backend.lib.exceptions import FieldValidationError


class CreateUserType(DjangoObjectType):
    class Meta:
        model = get_user_model()

    def resolve_password(self, info):
        return 'This is a write only field.'


class UserProfileType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        exclude_fields = ('email_verified', 'password', 'is_staff', 'is_superuser')

    def resolve_password(self, info):
        return 'This is a write only field.'

    @is_owner
    def resolve_email(self, info):
        return self.email

    @is_owner
    def resolve_telephone(self, info):
        return self.telephone


class UserLoginInfoType(graphene.ObjectType):
    logged_in = graphene.Field(graphene.Boolean())
    email = graphene.Field(graphene.String(), required=False)


class UserQuery(graphene.ObjectType):
    profiles = graphene.List(UserProfileType)
    profile = graphene.Field(UserProfileType, email=graphene.String())

    def resolve_profiles(self, info, **kwargs):
        return get_user_model().objects.all()

    def resolve_profile(self, info, email):
        return get_user_model().objects.get(email=email)


class CreateUserMutation(BaseMutation):
    user = graphene.Field(CreateUserType)

    class Meta:
        description = 'Create Users'
        error_type_class = Error
        error_type_field = "create_user_errors"
        model = get_user_model()
        unique_together = ['email']

    class Arguments:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        preferred_name = graphene.String(required=False)
        telephone = graphene.String(required=False)
        picture_url = graphene.String(required=False)

    class Validators:
        email = email_validator
        picture_url = url_validator

    @classmethod
    def perform_mutation(cls, info, first_name, last_name, email, password, **optional_fields):

        user = get_user_model().objects.create_user(
            first_name=first_name, last_name=last_name, email=email, password=password, **optional_fields
        )

        return CreateUserMutation(user=user)


class UpdateUserMutation(BaseMutation):
    user = graphene.Field(CreateUserType)

    class Meta:
        description = 'Update User'
        error_type_class = Error
        error_type_field = "update_user_errors"
        model = get_user_model()

    class Arguments:

        name = graphene.String(required=False)
        email = graphene.String(required=False)
        preferred_name = graphene.String(required=False)
        telephone = graphene.String(required=False)
        timezone = graphene.String(required=False)
        picture_url = graphene.String(required=False)

    class Validators:
        email = email_validator
        picture_url = url_validator

    @classmethod
    @is_authenticated
    def perform_mutation(cls, info, **user_data):
        user = info.context.user

        user = get_user_model().objects.filter(email=user.email)
        user.update(**user_data)

        return UpdateUserMutation(user=user.first())


class UserPasswordChangeMutation(BaseMutation):
    user = graphene.Field(CreateUserType)

    class Meta:
        description = 'Change user password'
        error_type_class = Error
        error_type_field = "change_password_user_errors"
        model = get_user_model()

    class Arguments:

        password = graphene.String(required=True)
        newPassword = graphene.String(required=True)

    @classmethod
    @is_authenticated
    def perform_mutation(cls, info, password, newPassword):
        user = info.context.user
        user = authenticate(email=user.email, password=password)

        if user is not None:
            user.set_password(newPassword)
            user.save()
            return UserPasswordChangeMutation(user=user)

        raise FieldValidationError('Invalid Password.', field=None, params=None, code='Invalid')


class LoginUserMutation(graphene.Mutation):
    user = graphene.Field(CreateUserType)
    logged_in = graphene.Boolean()

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, email, password):
        user = authenticate(email=email, password=password)

        if user is None:
            raise Exception('Invalid email or password')

        login(info.context, user)

        return LoginUserMutation(user=user, logged_in=True)


class LogoutUserMutation(graphene.Mutation):
    user = graphene.Field(CreateUserType)
    logged_in = graphene.Boolean()

    def mutate(self, info):
        logout(info.context)

        return LogoutUserMutation(user=None, logged_in=False)


class UserLoginCheckMutation(BaseMutation):
    logged_in = graphene.Boolean()
    user = graphene.Field(UserProfileType, required=False)

    class Meta:
        description = 'check user login status'

    @classmethod
    def perform_mutation(cls, info, **kwargs):

        if info.context.user.is_authenticated:
            return UserLoginCheckMutation(logged_in=True, user=info.context.user)

        return UserLoginCheckMutation(logged_in=False)


class UserMutation(graphene.ObjectType):
    create_user = CreateUserMutation.Field()
    login_user = LoginUserMutation.Field()
    logout_user = LogoutUserMutation.Field()
    check_login = UserLoginCheckMutation.Field()
    update_user = UpdateUserMutation.Field()
    change_password = UserPasswordChangeMutation.Field()
