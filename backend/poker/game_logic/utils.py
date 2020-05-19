from enum import Enum


class PokerSuites(Enum):
    CLUBS = 'C', 'c', 'clubs', '♣'
    HEARTS = 'H', 'h', 'hearts', '♥'
    SPADES = 'S', 's', 'spades', '♠'
    DIAMONDS = 'D', 'd', 'diamonds', '♦'

    @classmethod
    def values(cls):
        return [e.value for e in cls]

    @classmethod
    def list_values(cls):
        values = []
        for e in cls:
            values.extend(e.value)
        return values

    @classmethod
    def get_mapper(cls):
        mapper = {}
        for e in cls:
            val = e.value
            mapper[val[0]] = val
        return mapper


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
