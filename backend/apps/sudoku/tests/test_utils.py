from ..game_logic.utils import generate_row_values


class TestUtils:

    def test_generate_row_values_succeeds(self):
        puzzle_type = 3
        gen_row = generate_row_values(puzzle_type)

        assert len(gen_row) == puzzle_type * puzzle_type
