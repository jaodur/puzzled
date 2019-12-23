from enum import Enum
from ..utils import get_error_code_from_error, snake_to_camel_case


class MockError:
    def __init__(self, code):
        self.code = code


class MockEnumCode(Enum):
    INVALID = 'enum-invalid'


class TestGetErrorCodeFromError:

    def test_required_category(self):
        error_code = get_error_code_from_error(MockError('blank'))

        assert error_code == 'required'

    def test_unique_category(self):
        error_code = get_error_code_from_error(MockError('unique_for_date'))

        assert error_code == 'unique'

    def test_invalid_category(self):
        error_code = get_error_code_from_error(MockError('incomplete'))

        assert error_code == 'invalid'

    def test_enum_category(self):
        error_code = get_error_code_from_error(MockError(MockEnumCode.INVALID))

        assert error_code == 'enum-invalid'

    def test_unknown_category(self):
        error_code = get_error_code_from_error(MockError('unknown'))

        assert error_code == 'unknown'


class TestSnakeToCamel:
    def test_str_inputs(self):
        camel = snake_to_camel_case('test_argument')

        assert camel == 'testArgument'

    def test_non_str_inputs(self):
        camel = snake_to_camel_case(['argument'])

        assert camel == ['argument']
