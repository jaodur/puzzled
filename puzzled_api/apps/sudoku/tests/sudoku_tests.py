from ..game_logic import Sudoku
import pytest
from .fixtures import (
    puzzle,
    invalid_puzzle,
    expert_prefilled,
    expert_coords,
    hard_coords,
    medium_coords,
    str_representation
)


class TestSudoku:

    def test_invalid_puzzle_fails(self, invalid_puzzle):
        with pytest.raises(Exception) as e:
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

    def test_string_representation(self, puzzle, str_representation):

        str_rep = str(Sudoku(puzzle, 3))

        assert str_representation in str_rep

    def test_repr_representation(self, puzzle):
        repr_rep = repr(Sudoku(puzzle, 3))

        assert 'type=3' in repr_rep
