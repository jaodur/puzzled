import numpy as np
import time
from itertools import combinations
from math import floor
from bisect import insort


class Sudoku:

    def __init__(self, puzzle, type):
        self.puzzle_orig = puzzle
        self.type = type
        self.sectors = self._sectors()
        self.main_axis_pos_mapper, self.minor_axis_pos_mapper = self.sector_position_mapper()
        self.position = [i for i in range(self.type * self.type)]
        self.puzzle = puzzle

    @property
    def type(self):
        return self.__type

    @type.setter
    def type(self, type):
        arr = np.array(self.puzzle_orig)
        shape = type * type

        if arr.shape != (shape, shape):
            raise Exception(f'The shape generated from type "{type}" supplied i.e. ({shape}, {shape}) '
                            f'does not match the puzzle structure {arr.shape}')

        self.__type = type

    @property
    def puzzle(self):
        return self.__puzzle

    @puzzle.setter
    def puzzle(self, puzzle):
        self.__puzzle = self.__validate(puzzle)

    def solve(self):

        i, j, possible_values = self._find_next_empty_cell()

        if i == -1:
            return self

        for num in possible_values:
            implications = self.generate_implications(i, j, num)

            if self.solve():
                return self

            self.undo_implications(implications)

        return False

    def generate(self):
        pass

    def __validate(self, puzzle):

        try:
            puzzle = np.array(puzzle, dtype=np.int)
            errors = self._check_errors(puzzle)

        except TypeError:
            raise Exception('Please provide a nested list or array containing integers only')

        if errors:
            raise Exception(str(errors))

        return puzzle

    def _check_cells(self, *values, transpose=False, flattened=False):
        values = list(values)
        position = values.pop(-1)
        max_value = self.type * self.type
        errors, duplicates, invalids, duplicates_list = {}, {}, [], []
        template_duplicate_msg = 'duplicate values of {} at positions {}'

        for key, value in enumerate(values):
            if value:
                if transpose and not 0 < value <= max_value:
                    msg = f'value {value} at position ({position}, {key}) is not within the range 0 to {max_value}'
                    invalids.append(msg)
                    continue

                keys = duplicates.get(value, [])
                keys.append(key)
                duplicates[value] = keys

        duplicates = {key: value for key, value in duplicates.items() if len(value) > 1}

        for key, value in duplicates.items():
            if not transpose and not flattened:
                msg = template_duplicate_msg.format(key, [(val, position) for val in value])
                duplicates_list.append(msg)
                continue

            if not transpose and flattened:
                msg = template_duplicate_msg.format(key, [self.get_pos(position, val) for val in value])
                duplicates_list.append(msg)
                continue

            msg = template_duplicate_msg.format(key, [(position, val) for val in value])
            duplicates_list.append(msg)

        errors.__setitem__('invalid_values', invalids) if invalids else None
        errors.__setitem__('duplicate_values', duplicates_list) if duplicates_list else None

        return errors or None

    def _check_errors(self, puzzle):
        vectorized_check_cells = np.vectorize(self._check_cells)
        errors = {}

        def filter_errors(*values):
            values = filter(lambda val: bool(val), values)

            for dic in values:
                for key, val in dic.items():
                    errors.get(key).extend(val) if errors.get(key) else errors.__setitem__(key, val)

        for values in zip(vectorized_check_cells(*puzzle, self.position),
                          vectorized_check_cells(*puzzle.T, self.position, transpose=True),
                          vectorized_check_cells(*self._flatten_array(puzzle), self.position, flattened=True)
                          ):
            filter_errors(*values)

        return errors

    def _flatten_array(self, puzzle):

        flatten_array = []

        for x0, x1, y0, y1 in self.sectors:
            sliced_arr = np.array(puzzle[x0:x1, y0:y1]).ravel()
            flatten_array.append(list(sliced_arr))

        return np.array(flatten_array).T

    def sector_position_mapper(self):
        main_axis_pos_mapper, minor_axis_pos_mapper = {}, {}
        counter = 0

        for key, val in enumerate(self.sectors):
            x, _, y, _ = val
            main_axis_pos_mapper.__setitem__(key, (x, y))

        for x in range(self.type):
            for y in range(self.type):
                minor_axis_pos_mapper.__setitem__(counter, (x, y))
                counter += 1

        return main_axis_pos_mapper, minor_axis_pos_mapper

    def get_pos(self, main_pos, minor_pos):
        main_pos = self.main_axis_pos_mapper.get(main_pos)
        minor_pos = self.minor_axis_pos_mapper.get(minor_pos)

        return main_pos[0]+minor_pos[0], main_pos[1]+minor_pos[1] if main_pos and minor_pos else None

    def _sectors(self):
        unique_sector_keys = [0, self.type * self.type]
        for i in range(self.type * self.type):

            if i and not (i % self.type):
                unique_sector_keys.extend([i, i])

        sector = np.array(sorted(unique_sector_keys), dtype=np.int).reshape(-1, 2)

        return [(x[0], x[1], y[0], y[1]) for x in sector for y in sector]

    def _get_sector(self, row, col):
        row = floor(row / self.type) * self.type
        col = floor(col / self.type) * self.type
        return self.puzzle[row:row + self.type, col:col + self.type].ravel()

    def _find_next_empty_cell(self):

        empty_cells = self._get_missing_values()
        return empty_cells[0] if empty_cells else (-1, -1, -1)

    def _is_valid(self, i, j, num, sector=()):
        if not len(sector):
            sector = self._get_sector(i, j)

        return num not in set(sector).union(set(self.puzzle[i, :]), set(self.puzzle[:, j]))

    def generate_implications(self, i, j, num):
        self.puzzle[i, j] = num
        impl = [(i, j, num)]
        done = False

        while not done:
            done = True
            possible_values = set(range(1, self.type * self.type + 1))

            for position, coordinates in enumerate(self.sectors):
                x0, x1, y0, y1 = coordinates
                sec_array = self.puzzle[x0:x1, y0:y1].ravel()

                for minor_pos, value in enumerate(sec_array):

                    if not value:
                        row, col = self.get_pos(position, minor_pos)
                        filled_values = set(self.puzzle[row, :]).union(set(self.puzzle[:, col]), sec_array)
                        final_possible_values = possible_values.difference(filled_values)

                        val = final_possible_values.pop() if len(final_possible_values) == 1 else None
                        if val and self._is_valid(row, col, val):
                            self.puzzle[row, col] = val
                            impl.append((row, col, val))
                            done = False

        return impl

    def undo_implications(self, impl):
        for x, y, _ in impl:
            self.puzzle[x, y] = 0

    def _get_missing_values(self, dict_output_format=False):
        possible_values = []
        missing_val_dict = {}
        arr = set(range(1, self.type * self.type + 1))

        for position, coordinates in enumerate(self.sectors):
            x0, x1, y0, y1 = coordinates

            sec_array = self.puzzle[x0:x1, y0:y1].ravel()

            for minor_pos, value in enumerate(sec_array):

                if not value:
                    row, col = self.get_pos(position, minor_pos)
                    filled_values = set(self.puzzle[row, :]).union(set(self.puzzle[:, col]), sec_array)
                    missing_values = arr.difference(filled_values)
                    possible_values.append((row, col, missing_values))
                    missing_val_dict[f'{row}-{col}'] = missing_values

        return missing_val_dict if dict_output_format else sorted(possible_values, key=lambda val: len(val[2]))

    def row_col_mapper(self):
        mapper = {}
        arr = np.array(range(self.type*self.type)).reshape(-1, self.type)
        for lst in arr:
            comb = combinations(lst, self.type - 1)
            for key, value in zip(reversed(lst), comb):
                mapper.__setitem__(key, list(value))
        return mapper

    def __str__(self):

        sep = '----'
        separator = ' {}'.format(sep*self.type) * self.type
        row = '\n{}{}'.format('{}{}'.format('|', f'{{: ^{len(sep)}}}'*self.type)*self.type, '|')

        str_rep = separator

        for i, values, values_orig in zip(range(1, (self.type*self.type) + 1), self.puzzle, self.puzzle_orig):

            mark_orig = lambda val, val_orig: val and val == val_orig and f'{val}*' or val

            str_rep = f'{str_rep}{row.format(*map(mark_orig, values, values_orig))}'

            if not i % self.type:
                str_rep = f'{str_rep}\n{separator}'

        return str_rep

    def __repr__(self):
        return f'{self.__class__.__name__}(puzzle={self.puzzle}, type={self.type})'
