from ..game_logic import Sudoku
import pytest
from .fixtures import invalid_puzzle


class TestSudoku:

    def test_invalid_puzzle_fails(self, invalid_puzzle):
        with pytest.raises(Exception) as e:
            Sudoku(invalid_puzzle, 3)
