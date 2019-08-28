import numpy as np
from itertools import combinations
from math import floor


class Sudoku:

    def __init__(self, puzzle, type):
        self.puzzle_orig = puzzle
        self.type = type
        self.sectors = self._sectors()
        self.main_axis_pos_mapper, self.minor_axis_pos_mapper = self.sector_position_mapper()
        self.position = [i for i in range(self.type * self.type)]
        self.puzzle = puzzle
        self.filled_values = self._initial_filled_values()
        self.empty_cells = []
        self.allowed_values = {val for val in range(1, self.type * self.type + 1)}

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

        i, j, possible_values = self._find_next_empty_cell(run_update=True)

        if i == -1:
            return self

        for num in set(possible_values):

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
                    msg = f'value {value} at position ({position}, {key}) is not within the range of 1 to {max_value}'
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
        row_start, row_end, col_start, col_end = self._get_sector_coord(row, col)

        return self.puzzle[row_start:row_end, col_start:col_end].ravel()

    def _get_sector_coord(self, row, col):
        row = floor(row / self.type) * self.type
        col = floor(col / self.type) * self.type

        return row, row + self.type, col, col + self.type

    def update_empty_cells(self):
        empty_cells = []

        for row in range(self.type * self.type):
            for col in range(self.type * self.type):

                if not self.puzzle[row, col]:
                    possible_values = self.allowed_values.difference(self.get_filled_values(row, col))
                    empty_cells.append((row, col, possible_values))

        return sorted(empty_cells, key=lambda val: len(val[2]), reverse=True)

    def _find_next_empty_cell(self, run_update=False):

        if run_update:
            self.empty_cells = self.update_empty_cells()

        try:
            next_cell = self.empty_cells.pop()
        except IndexError:
            return -1, -1, -1

        if run_update:
            return next_cell

        row, col, _ = next_cell

        possible_values = self.allowed_values.difference(self.get_filled_values(row, col))

        return row, col, possible_values

    def _is_valid(self, row, col, num):
        return num not in self.get_filled_values(row, col)

    def get_filled_values(self, row, col):
        row_values = self.filled_values.get(f'r-{row}')
        col_values = self.filled_values.get(f'c-{col}')
        sector_coords = self._get_sector_coord(row, col)
        sector_values = self.filled_values.get('{}-{}-{}-{}'.format(*sector_coords))

        return sector_values.union(row_values, col_values)

    def update_filled_values(self, row, col, val):
        self.filled_values.get(f'r-{row}').add(val)
        self.filled_values.get(f'c-{col}').add(val)
        sector_coords = self._get_sector_coord(row, col)
        self.filled_values.get('{}-{}-{}-{}'.format(*sector_coords)).add(val)

    def discard_filled_values(self, row, col, val):
        self.filled_values.get(f'r-{row}').discard(val)
        self.filled_values.get(f'c-{col}').discard(val)
        sector_coords = self._get_sector_coord(row, col)
        self.filled_values.get('{}-{}-{}-{}'.format(*sector_coords)).discard(val)

    def generate_implications(self, i, j, num):

        self.puzzle[i, j] = num
        impl = [(i, j, num)]
        self.update_filled_values(i, j, num)
        done = False

        while not done:
            done = True
            row, col, possible_values = self._find_next_empty_cell()

            # for num in possible_values:
            #
            #     if self._is_valid(row, col, num):
            #         self.puzzle[row, col] = num
            #         impl.append((row, col, num))
            #         self.update_filled_values(row, col, num)
            #         # print('inner', self.possible_values.get(f'{row}-{col}'))
            #         # self.possible_values.get(f'{row}-{col}').discard(num)
            #         done = False
            #         break

            if row != -1:
                if len(possible_values) == 1:
                    num = possible_values.pop()
                    self.puzzle[row, col] = num
                    impl.append((row, col, num))
                    self.update_filled_values(row, col, num)

                    done = False

        return impl

    def undo_implications(self, impl):
        for row, col, num in impl:
            self.puzzle[row, col] = 0
            self.discard_filled_values(row, col, num)

    def _initial_filled_values(self):
        initial_filled_values = {}

        for ref in range(self.type * self.type):
            initial_filled_values[f'r-{ref}'] = set(self.puzzle[ref, :])
            initial_filled_values[f'c-{ref}'] = set(self.puzzle[:, ref])

        for row_start, row_end, col_start, col_end in self.sectors:
            initial_filled_values[f'{row_start}-{row_end}-{col_start}-{col_end}'] = \
                set(self.puzzle[row_start: row_end, col_start: col_end].ravel())

        return initial_filled_values

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
        return f'{self.__class__.__name__}(puzzle=\n{np.array_repr(self.puzzle)}, type={self.type})'
