from functools import wraps
from backend.lib.exceptions import FieldValidationError


def is_authenticated(func):

    @wraps(func)
    def decorated(*args, **kwargs):
        cls, info, *others = args

        if not info.context.user.is_authenticated:
            raise FieldValidationError('User profile not found. Please login.', field=None, params=None, code='Invalid')

        return func(*args, **kwargs)

    return decorated
