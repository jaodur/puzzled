import numpy as np


def generate_row_values(puzzle_type):

    row = np.arange(1, (puzzle_type * puzzle_type) + 1)
    np.random.shuffle(row)

    return row
