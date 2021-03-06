import numpy as np
from ..game_logic import Sudoku
import pytest
from .fixtures import (
    puzzle,
    invalid_puzzle,
    expert_prefilled,
    expert_coords,
    hard_coords,
    medium_coords,
    easy_coords,
    str_representation
)


class TestSudoku:

    def test_invalid_puzzle_fails(self, invalid_puzzle):
        with pytest.raises(Exception):
            Sudoku(invalid_puzzle, 3)

    def test_difficulty_pattern_generator_expert_succeeds(self, expert_prefilled, expert_coords):
        prefilled, coords = Sudoku.difficulty_pattern_generator(3, 'expert')

        assert prefilled == expert_prefilled
        assert coords == expert_coords

    def test_difficulty_pattern_generator_hard_succeeds(self, hard_coords):
        prefilled, coords = Sudoku.difficulty_pattern_generator(3, 'hard')

        assert prefilled == []
        assert coords == hard_coords

    def test_difficulty_pattern_generator_medium_succeeds(self, medium_coords):
        prefilled, coords = Sudoku.difficulty_pattern_generator(3, 'medium')

        assert prefilled == []
        assert coords == medium_coords

    def test_difficulty_pattern_generator_easy_succeeds(self, easy_coords):
        prefilled, coords = Sudoku.difficulty_pattern_generator(3, 'easy')

        assert prefilled == []
        assert coords == easy_coords

    def test_string_representation(self, puzzle, str_representation):

        str_rep = str(Sudoku(puzzle, 3))

        assert str_representation in str_rep

    def test_repr_representation(self, puzzle):
        repr_rep = repr(Sudoku(puzzle, 3))

        assert 'type=3' in repr_rep

    def test_get_sector_succeeds(self, puzzle):

        sector = Sudoku(puzzle, 3)._get_sector(1, 2)

        assert list(sector) == list([5, 7, 0, 0, 4, 0, 9, 0, 0])

    def test_update_empty_cells_succeeds(self, puzzle):

        cells = Sudoku(puzzle, 3).update_empty_cells()

        assert cells[-1] == (5, 6, {8, 1})

    def test_find_next_empty_cell_with_update_succeeds(self, puzzle):

        next_cell = Sudoku(puzzle, 3)._find_next_empty_cell(run_update=True)

        assert next_cell == (5, 6, {8, 1})

    def test_find_next_empty_cell_without_update_fails(self, puzzle):

        next_cell = Sudoku(puzzle, 3)._find_next_empty_cell()

        assert next_cell == (-1, -1, -1)

    def test_row_col_mapper(self, puzzle):
        row_col_mapper = Sudoku(puzzle, 3).row_col_mapper()

        assert row_col_mapper == \
            {2: [0, 1], 1: [0, 2], 0: [1, 2], 5: [3, 4], 4: [3, 5], 3: [4, 5], 8: [6, 7], 7: [6, 8], 6: [7, 8]}

    def test_row_col_translate_translate_row(self, puzzle):
        translator = Sudoku.row_col_translate(translate_row=True)
        puzzle_type = 3
        puzzle = Sudoku(puzzle, puzzle_type).puzzle
        original_puzzle = np.array(puzzle)
        translated = translator(puzzle, puzzle_type)

        assert not np.array_equal(translated, original_puzzle)

    def test_row_col_translate_translate_column(self, puzzle):
        translator = Sudoku.row_col_translate(translate_row=False)
        puzzle_type = 3
        puzzle = Sudoku(puzzle, puzzle_type).puzzle
        original_puzzle = np.array(puzzle)
        translated = translator(puzzle, puzzle_type)

        assert not np.array_equal(translated, original_puzzle)

    def test_row_col_exchange_translate_translate_row(self, puzzle):
        translator = Sudoku.row_col_exchange_translate(translate_row=True)
        puzzle_type = 3
        puzzle = Sudoku(puzzle, puzzle_type).puzzle
        original_puzzle = np.array(puzzle)
        translated = translator(puzzle, puzzle_type)

        assert not np.array_equal(translated, original_puzzle)

    def test_row_col_exchange_translate_translate_column(self, puzzle):
        translator = Sudoku.row_col_exchange_translate(translate_row=False)
        puzzle_type = 3
        puzzle = Sudoku(puzzle, puzzle_type).puzzle
        original_puzzle = np.array(puzzle)
        translated = translator(puzzle, puzzle_type)

        assert not np.array_equal(translated, original_puzzle)

    def test_roll_translate(self, puzzle):
        puzzle_type = 3
        puzzle = Sudoku(puzzle, puzzle_type).puzzle
        original_puzzle = np.array(puzzle)
        translated = Sudoku.roll_translate(puzzle)

        assert not np.array_equal(translated, original_puzzle)

    def test_translate_puzzle(self, puzzle):
        puzzle_type = 3
        puzzle = Sudoku(puzzle, puzzle_type).puzzle
        original_puzzle = np.array(puzzle)
        translated = Sudoku.translate_puzzle(puzzle, puzzle_type)

        assert not np.array_equal(translated, original_puzzle)

    def test_invalid_type_fails(self):
        with pytest.raises(Exception) as err:
            Sudoku([1, 2, 3, 4, 5], 3)

        assert err.value.args[0] == 'The shape generated from type "3" supplied i.e. ' \
                                    '(9, 9) does not match the puzzle structure (5,)'
