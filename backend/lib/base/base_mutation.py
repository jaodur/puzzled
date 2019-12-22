import graphene
from graphene.types.mutation import MutationOptions
from graphene.utils.props import props
from django.core.exceptions import ImproperlyConfigured
from backend.lib.exceptions import FieldValidationError, GraphQLValidationError
from backend.lib.types import Error
from backend.lib.utils import get_error_code_from_error, snake_to_camel_case


def get_error_fields(error_type_class, error_type_field):
    return {
        error_type_field: graphene.Field(
            graphene.List(
                graphene.NonNull(error_type_class),
                description="List of errors that occurred while executing the mutation.",
            ),
            default_value=[],
        )
    }


def validation_error_to_error_type(validation_error):
    """Convert a ValidationError into a list of Error types."""

    if not isinstance(validation_error, FieldValidationError):
        raise Exception(f'All ValidationError Exceptions must inherit from {FieldValidationError.__name__}') from validation_error

    return [
        (
            Error(field=validation_error.field, message=validation_error.message, code=validation_error.code),
            get_error_code_from_error(validation_error),
            validation_error.params
        )
    ]


class BaseMutation(graphene.Mutation):
    errors = graphene.List(
        graphene.NonNull(Error),
        description="List of errors that occurred while executing the mutation.",
    )

    class Meta:
        abstract = True

    @classmethod
    def __init_subclass_with_meta__(cls, description=None, _meta=None, error_type_class=None, error_type_field=None, **options):
        if not _meta:
            _meta = MutationOptions(cls)

        if not description:
            raise ImproperlyConfigured("No description provided in Meta")

        _meta.error_type_class = error_type_class
        _meta.error_type_field = error_type_field
        super().__init_subclass_with_meta__(description=description, _meta=_meta, **options)

        if error_type_class and error_type_field:
            cls._meta.fields.update(get_error_fields(error_type_class, error_type_field))

    @classmethod
    def mutate(cls, root, info, **data):

        try:
            response = cls.perform_mutation(info, **data)
            if response.errors is None:
                response.errors = []
            return response
        except Exception as e:
            return cls.handle_errors(e)

    @classmethod
    def perform_mutation(cls, root, info, **data):
        pass

    @classmethod
    def handle_errors(cls, error, **extra):
        errors = validation_error_to_error_type(error)
        return cls.handle_typed_errors(errors, **extra)

    @classmethod
    def handle_typed_errors(cls, errors: list, **extra):
        """Return class instance with errors."""

        if cls._meta.error_type_class is not None and cls._meta.error_type_field is not None:
            typed_errors = [
                cls._meta.error_type_class(field=e.field, message=e.message, code=code)
                for e, code, _params in errors
            ]
            extra.update({cls._meta.error_type_field: typed_errors})

            formatted_errors = [dict(field=snake_to_camel_case(error.field), message=error.message, code=error.code) for error in typed_errors]

            raise GraphQLValidationError('Validation failed', formatted_errors)
        return cls(errors=[e[0] for e in errors], **extra)

