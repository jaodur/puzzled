from enum import Enum


class PokerSuites(Enum):
    CLUBS = 'C'
    HEARTS = 'H'
    SPADES = 'S'
    DIAMONDS = 'D'

    @classmethod
    def values(cls):
        return [e.value for e in cls]


class PokerHandValue(Enum):
    KIND_5 = 9
    STRAIGHT_FLUSH = 8
    KIND_4 = 7
    FULL_HOUSE = 6
    FLUSH = 5
    STRAIGHT = 4
    KIND_3 = 3
    PAIRS_2 = 2
    KIND_2 = 1
    HIGH_CARD = 0
