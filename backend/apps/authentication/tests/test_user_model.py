from time import sleep
from django.contrib.auth import get_user_model
from django.core import signing
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

    def test_confirm_email_captures_expired_data(self, db, user_data):

        user = get_user_model().objects.create_user(**user_data)
        data = {
            'id': user.id,
            'new_email': user.email,
        }

        expired_data = signing.dumps(data)

        sleep(2)

        error, message = user.confirm_email(expired_data)

        assert error

        assert message == 'Your email confirmation link has expired. Please generate new link.'

    def test_confirm_email_captures_invalid_data(self, db, user_data):
        invalid_data = 'invalid_eyJpZCI6NSwibmV3X2VtYWlsIjoidGVzdEBnbWFpbC5jb20ifQ:1j5vYg:ssYktPALd2OHFybk3ACe1f4RC8o'

        user = get_user_model().objects.create_user(**user_data)

        error, message = user.confirm_email(invalid_data, max_age=60)

        assert error

        assert message == 'This email confirmation link is invalid. Please try again.'

    def test_confirm_email_captures_invalid_user_id(self, db, user_data):

        user = get_user_model().objects.create_user(**user_data)

        data = {
            'id': user.id + 1,
            'new_email': user.email,
        }

        signed_data = signing.dumps(data)
        error, message = user.confirm_email(signed_data)

        assert error

        assert message == 'This email confirmation link is for a different account. Please try again.'

    def test_confirm_email_captures_invalid_user_email(self, db, user_data):
        user = get_user_model().objects.create_user(**user_data)

        data = {
            'id': user.id,
            'new_email': 'differentuseremail@email.com',
        }

        signed_data = signing.dumps(data)
        error, message = user.confirm_email(signed_data)

        assert error

        assert message == 'The email being verified changed. Please regenerate confirmation link'

    def test_confirm_email_succeeds(self, db, user_data):
        user = get_user_model().objects.create_user(**user_data)

        data = {
            'id': user.id,
            'new_email': user.email,
        }

        signed_data = signing.dumps(data)
        error, message = user.confirm_email(signed_data)

        assert not error

        assert message is None

        assert user.email_verified
