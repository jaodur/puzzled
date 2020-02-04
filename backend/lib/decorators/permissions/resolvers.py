from functools import wraps


def is_owner(func):

    @wraps(func)
    def decorated(*args, **kwargs):
        self, info, *others = args

        if self == info.context.user:
            return func(*args, **kwargs)

        return 'You do not have the required permission to view this field'

    return decorated
