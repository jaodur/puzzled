from ..base.base_graphql_view import BaseGraphQLView, GraphQLValidationError


class TestBaseGraphqlView:

    def test_format_error_handles_graphql_validation_errors(self):
        error = GraphQLValidationError(message='invalid email address', errors=[dict(
            message='invalid email address', field='email', params='invalidemail')])
        formatted_error = BaseGraphQLView.format_error(error)

        assert formatted_error['message'] == 'invalid email address'

    def test_format_errors_handles_other_exceptions(self):
        formatted_error = BaseGraphQLView.format_error(Exception('Normal exception'))

        assert formatted_error['message'] == 'Normal exception'
