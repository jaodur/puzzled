from backend.lib.exceptions import GraphQLValidationError
from collections import Sequence
from graphene_django.views import GraphQLView
from graphql.error import format_error as format_validation_error, GraphQLError, GraphQLLocatedError
import six


class BaseGraphQLView(GraphQLView):
    @staticmethod
    def format_error(error):
        if isinstance(error, GraphQLLocatedError):
            if isinstance(error.original_error, GraphQLValidationError):
                formatted_error = error.original_error.errors
                return formatted_error

        if isinstance(error, GraphQLError) or isinstance(error, GraphQLValidationError):
            return format_validation_error(error)

        return {"message": six.text_type(error)}

    def get_response(self, request, data, show_graphiql=False):
        validation_error_occurred = False
        query, variables, operation_name, id = self.get_graphql_params(request, data)

        execution_result = self.execute_graphql_request(
            request, data, query, variables, operation_name, show_graphiql
        )

        status_code = 200
        if execution_result:
            response = {}

            if execution_result.errors:
                response["errors"] = [
                    self.format_error(e) for e in execution_result.errors
                ]

                if response.get('errors'):
                    errors = response.get('errors')
                    if isinstance(errors[0], Sequence):
                        response.update({'errors': errors[0]})
                        validation_error_occurred = True

            if execution_result.invalid:
                status_code = 400
            if validation_error_occurred:
                # ensure the data attr is not added to the response when a validation error occurs
                pass
            else:
                response["data"] = execution_result.data

            if self.batch:
                response["id"] = id
                response["status"] = status_code

            result = self.json_encode(request, response, pretty=show_graphiql)
        else:
            result = None

        return result, status_code
