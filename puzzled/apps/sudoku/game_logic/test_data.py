__all__ = ('test', 'test_2', 'test_3', 'test_4', 'test_5', 'test_6', 'test_7', 'easy', 'v4x4')

easy = [[5,1,7,6,0,0,0,3,4],
         [2,8,9,0,0,4,0,0,0],
         [3,4,6,2,0,5,0,9,0],
         [6,0,2,0,0,0,0,1,0],
         [0,3,8,0,0,6,0,4,7],
         [0,0,0,0,0,0,0,0,0],
         [0,9,0,0,0,0,0,7,8],
         [7,0,3,4,0,0,5,6,0],
         [0,0,0,0,0,0,0,0,0]]

test = [[5, 7, 0, 0, 0, 0, 3, 0, 0],
        [0, 4, 0, 0, 5, 3, 9, 0, 0],
        [9, 0, 0, 0, 0, 8, 0, 0, 0],

        [0, 0, 6, 5, 0, 0, 0, 0, 4],
        [3, 0, 0, 6, 4, 9, 0, 0, 0],
        [4, 0, 5, 0, 0, 0, 0, 6, 0],

        [0, 0, 0, 1, 0, 5, 2, 0, 0],
        [0, 5, 0, 0, 0, 0, 7, 0, 0],
        [0, 0, 0, 0, 7, 0, 0, 5, 1]]

test_2 = [[5, 7, 0, 0, 0, 0, 3, 0, 0],
          [0, 4, 0, 0, 5, 3, 9, 0, 0],
          [9, 0, 0, 0, 0, 8, 0, 0, 0],

          [0, 0, 6, 5, 0, 0, 0, 0, 4],
          [3, 0, 0, 6, 4, 9, 0, 4, 0],
          [4, 0, 5, 0, 0, 0, 0, 6, 0],

          [0, 0, 0, 1, 0, 5, 2, 0, 0],
          [0, 5, 0, 0, 0, 0, 7, 0, 0],
          [9, 0, 0, 0, 7, 0, 0, 5, 1]]

test_3 = [[5, 7, 0, 0, 0, 0, 3, 0, 0],
          [0, 4, 0, 0, 5, 3, 9, 0, 0],
          [9, 0, 0, 0, 0, 8, 0, 0, 0],

          [0, 0, 6, 5, 0, 11, 0, 0, 4],
          [3, 0, 0, 6, 4, 9, 0, 4, 0],
          [4, 0, 5, 0, 0, 0, 0, 6, 0],

          [0, 0, 0, 1, 0, 5, 2, 0, 0],
          [0, 5, 0, 0, 0, 0, 7, 0, 0],
          [9, 0, 10, 0, 7, 0, 0, 5, 1]]

test_4 = [[5, 7, 0, 0, 0, 0, 3, 0, 0],
          [0, 4, 0, 0, 5, 3, 9, 0, 0],
          [9, 0, 0, 0, 0, 8, 0, 0, 0],

          [0, 0, 6, 5, 0, 11, 0, 0, 4],
          [3, 0, 0, 6, 4, 9, 0, 4, 0],
          [4, 0, 5, 0, 0, 0, 0, 6, 0],

          [0, 0, 0, 1, 0, 5, 2, 0, 0],
          [0, 5, 0, 0, 0, 0, 7, 0, 0],
          [9, 0, 10, 0, 7, 9, 0, 5, 1]]

test_5 = [[5, 7, 0, 0, 0, 0, 3, 0, 0],
          [0, 4, 0, 0, 5, 3, 9, 0, 0],
          [9, 0, 7, 0, 0, 8, 0, 0, 0],

          [0, 0, 6, 5, 0, 0, 0, 0, 4],
          [3, 0, 0, 6, 4, 9, 0, 4, 0],
          [4, 0, 5, 0, 9, 0, 0, 6, 0],

          [0, 0, 0, 1, 0, 5, 2, 0, 5],
          [0, 5, 0, 0, 0, 0, 7, 5, 0],
          [9, 0, 0, 0, 7, 0, 0, 5, 1]]

v4x4 = [[9, 16, 0, 13, 0, 0, 0, 0,   0, 11, 0, 0,  0, 0, 0, 7],
          [0, 0, 0, 11,  0, 0, 0, 16,  0, 0, 0, 12,  8, 5, 14, 0],
          [12, 0, 5, 0,  0, 0, 14, 7,  0, 8, 0, 0,   1, 0, 6, 0],
          [2, 0, 0, 0,   0, 0, 0, 1,   4, 0, 10, 3,  0, 0, 0, 0],

          [0, 0, 0, 0,    0, 2, 16, 14,  0, 4, 1, 0,   0, 15, 8, 5],
          [0, 2, 0, 7,    0, 0, 0, 13,   0, 12, 0, 0,  11, 0, 4, 0],
          [0, 13, 0, 14,  0, 0, 7, 4,    0, 6, 0, 0,   10, 3, 0, 0],
          [10, 0, 4, 5,   15, 0, 3, 0,   0, 0, 8, 14,  0, 0, 0, 0],

          [0, 0, 0, 0,   6, 8, 0, 0,    0, 9, 0, 13,   4, 1, 0, 11],
          [0, 0, 15, 3,  0, 0, 5, 0,    8, 2, 0, 0,    16, 0, 7, 0],
          [0, 6, 0, 4,   0, 0, 9, 0,    10, 0, 0, 0,   15, 0, 13, 0],
          [8, 1, 7, 0,   0, 13, 10, 0,  14, 15, 4, 0,  0, 0, 0, 0],

          [0, 0, 0, 0,    14, 15, 0, 5,  1, 0, 0, 0,  0, 0, 0, 3],
          [0, 8, 0, 9,    0, 0, 13, 0,   5, 3, 0, 0,  0, 12, 0, 6],
          [0, 3, 10, 15,  12, 0, 0, 0,   6, 0, 0, 0,  5, 0, 0, 0],
          [7, 0, 0, 0,    0, 0, 8, 0,    0, 0, 0, 0,  2, 0, 9, 4]]

test_6 = [[5, 7, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 4, 0, 0, 5, 3, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [9, 0, 7, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [9, 0, 7, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

          [0, 0, 6, 5, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0],
          [3, 0, 0, 6, 4, 9, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0],
          [4, 0, 5, 0, 9, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0],
          [4, 0, 5, 0, 9, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0],

          [0, 0, 6, 5, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0],
          [3, 0, 0, 6, 4, 9, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0],
          [4, 0, 5, 0, 9, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0],
          [4, 0, 5, 0, 9, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0],

          [0, 0, 0, 1, 0, 5, 2, 0, 5, 0, 0, 0, 0, 0, 0, 0],
          [0, 5, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 5, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0],
          [9, 0, 0, 0, 7, 0, 0, 5, 1, 0, 0, 0, 0, 0, 0, 0]]

test_7 = [[5, 7, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 3, 0],
          [0, 4, 0, 0, 5, 3, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 4, 0, 0, 5, 3, 9, 0],
          [9, 0, 7, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 7, 0, 0, 8, 0, 0, 8],
          [9, 0, 7, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 7, 0, 0, 8, 0, 0, 0],
          [9, 0, 7, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 7, 0, 0, 8, 0, 0, 0],

          [0, 0, 6, 5, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 3, 0],
          [3, 0, 0, 6, 4, 9, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 5, 0, 9, 0, 0, 6, 0],
          [3, 0, 0, 6, 4, 9, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 5, 0, 9, 0, 0, 6, 0],
          [4, 0, 5, 0, 9, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 5, 0, 9, 0, 0, 6, 0],
          [4, 0, 5, 0, 9, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 6, 4, 9, 0, 4, 0],

          [0, 0, 6, 5, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 5, 7, 0, 0, 0, 0, 3, 0],
          [3, 0, 0, 6, 4, 9, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 5, 0, 9, 0, 0, 6, 0],
          [3, 0, 0, 6, 4, 9, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 5, 0, 9, 0, 0, 6, 0],
          [4, 0, 5, 0, 9, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 5, 0, 9, 0, 0, 6, 0],
          [4, 0, 5, 0, 9, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 6, 4, 9, 0, 4, 0],

          [0, 0, 6, 5, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 5, 0, 9, 0, 0, 6, 0],
          [3, 0, 0, 6, 4, 9, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 5, 0, 9, 0, 0, 6, 0],
          [4, 0, 5, 0, 9, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 5, 0, 9, 0, 0, 6, 0],
          [4, 0, 5, 0, 9, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 5, 0, 9, 0, 0, 6, 0],
          [4, 0, 5, 0, 9, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 5, 0, 9, 0, 0, 6, 0],

          [0, 0, 0, 1, 0, 5, 2, 0, 5, 0, 0, 0, 0, 0, 0, 0, 4, 0, 5, 0, 9, 0, 0, 6, 0],
          [0, 5, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 5, 0, 9, 0, 0, 6, 0],
          [0, 5, 0, 0, 0, 0, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 5, 0, 9, 0, 0, 6, 0],
          [9, 0, 0, 0, 7, 0, 0, 5, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 5, 0, 9, 0, 0, 6, 0],
          [9, 0, 0, 0, 7, 0, 0, 5, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 5, 0, 9, 0, 0, 6, 0]]

