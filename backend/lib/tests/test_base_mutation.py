import pytest
from backend.lib.exceptions import FieldValidationError
from ..base.base_mutation import validation_error_to_error_type


class TestValidationErrorToErrorType:

    def test_conversion_to_error_type_succeeds(self):

        error, code, param = validation_error_to_error_type(
            FieldValidationError('test message', 'test_field', 'test_value')
        )[0]

        assert error.code == 'required'
        assert error.message == 'test message'
        assert error.field == 'test_field'
        assert error.field == 'test_field'
        assert code == 'required'
        assert param == 'test_value'

    def test_non_field_validation_error_are_caught(self):

        with pytest.raises(Exception) as err:
            validation_error_to_error_type(Exception('test exception'))

        assert str(err.value) == 'All ValidationError Exceptions must inherit from FieldValidationError'
