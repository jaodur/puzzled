from enum import Enum


class PokerSuites(Enum):
    CLUBS = 'C'
    HEARTS = 'H'
    SPADES = 'S'
    DIAMONDS = 'D'

    @classmethod
    def values(cls):
        return [e.value for e in cls]
