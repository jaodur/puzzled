import graphene
from .validators import validate_email, url_validator


class Error(graphene.ObjectType):
    field = graphene.String(
        description=(
            "Name of a field that caused the error. A value of `null` indicates that "
            "the error isn't associated with a particular field."
        ),
        required=False,
    )
    message = graphene.String(description="The error message.")
    code = graphene.String()

    class Meta:
        description = "Represents an error in the input of a mutation."


class EmailField(graphene.String):

    @staticmethod
    def parse_value(value):

        if not validate_email(value):
            return None
        return super().parse_value(value)

    @staticmethod
    def parse_literal(ast):
        if validate_email(ast.value):
            return ast.value


class URLField(graphene.String):
    @staticmethod
    def parse_value(value):
        try:
            url_validator(value)
        except ValueError:
            return None
        return super().parse_value(value)

    @staticmethod
    def parse_literal(ast):
        try:
            url_validator(ast.value)
        except ValueError:
            pass
        else:
            return ast.value
