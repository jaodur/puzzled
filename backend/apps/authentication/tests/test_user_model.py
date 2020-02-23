from django.contrib.auth import get_user_model
import pytest
from backend.lib.exceptions import FieldValidationError
from .fixtures import user, user_data


class TestUserModel:

    def test_str_representation(self, user):
        assert str(user) == user.name.strip()

    def test_str_representation_with_email(self, user):
        user.name = ''
        assert str(user) == f'{user.email}'

    def test_repr_representation(self, user):
        assert repr(user) == '<User email={!r}>'.format(user.email)

    def test_superuser_creation_with_valid_data_succeeds(self, db, user_data):
        user = get_user_model().objects.create_superuser(**user_data)
        assert user.name == f'{user_data.get("first_name")} {user_data.get("last_name")}'
        assert user.is_staff

    def test_superuser_creation_with_invalid_is_staff_flag_fails(self, user_data):
        with pytest.raises(ValueError) as err:
            user_data['is_staff'] = False
            get_user_model().objects.create_superuser(**user_data)

        assert str(err.value) == 'Superuser must have is_staff=True.'

    def test_user_creation_with_valid_data_succeeds(self, db, user_data):
        user = get_user_model().objects.create_user(**user_data)
        assert user.name == f'{user_data.get("first_name")} {user_data.get("last_name")}'

    def test_user_creation_with_invalid_tz_succeeds(self, db, user_data):
        user = get_user_model().objects.create_user(timezone='invalid_tz', **user_data)
        assert user.name == f'{user_data.get("first_name")} {user_data.get("last_name")}'

    def test_user_creation_with_no_password_succeeds(self, db, user_data):
        user_data['password'] = None
        user = get_user_model().objects.create_user(**user_data)
        assert user.name == f'{user_data.get("first_name")} {user_data.get("last_name")}'

    def test_user_creation_with_invalid_email_fails(self, user_data):

        with pytest.raises(FieldValidationError) as err:
            user_data['email'] = 'invalid_email'
            get_user_model().objects.create_user(**user_data)

        assert str(err.value) == 'Not a valid email address'

    def test_user_creation_with_email_not_set_fails(self, user_data):

        with pytest.raises(ValueError) as err:
            user_data['email'] = None
            get_user_model().objects.create_user(**user_data)

        assert str(err.value) == 'The given email must be set'

    def test_user_creation_with_invalid_picture_url_fails(self, user_data):

        with pytest.raises(FieldValidationError) as err:
            user_data['picture_url'] = 'invalid_picture_url'
            get_user_model().objects.create_user(**user_data)

        assert str(err.value) == 'Not a valid url'
