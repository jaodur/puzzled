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


class PokerHandName(Enum):
    KIND_5 = 9, 'Five of a Kind'
    STRAIGHT_FLUSH = 8, 'Straight Flush'
    KIND_4 = 7, 'Four of a Kind'
    FULL_HOUSE = 6, 'Full House'
    FLUSH = 5, 'Flush'
    STRAIGHT = 4, 'Straight'
    KIND_3 = 3, 'Three of a Kind'
    PAIRS_2 = 2, 'Two Pairs'
    KIND_2 = 1, 'One Pair'
    HIGH_CARD = 0, 'High Card'

    @classmethod
    def get_mapper(cls):
        mapper = {}
        for e in cls:
            val = e.value
            mapper[val[0]] = val[-1]
        return mapper


class PokerActions(Enum):
    FOLD = 'Fold'
    CALL = 'Call'
    RAISE = 'Raise'


class PokerGameTypes(Enum):
    TEXAS_HOLD_EM = 'TexasHoldEm'


class PokerDeckTypes(Enum):
    STANDARD_SINGLE = 'StandardSingle'


class PokerRoundTypes(Enum):
    PRE_FLOP = 'PreFlop'
    FLOP = 'Flop'
    TURN = 'Turn'
    RIVER = 'River'
    SHOWDOWN = 'Showdown'
