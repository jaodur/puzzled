import numpy as np


def generate_rand_coords(high_value, size):

    return np.random.random_integers(low=0, high=high_value, size=(size, 2))
