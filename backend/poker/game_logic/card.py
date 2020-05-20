from .utils import PokerSuites

VOID = '-'
SUITE_MAPPER = PokerSuites.get_mapper()
RANK_MAPPER = f'{VOID}{VOID}23456789TJQKA'


class Card:

    def __init__(self, card):
        self.suite = None
        self.value = None
        self.rank = None
        self.raw_value = card.upper()
        self.card = card

    @property
    def card(self):
        return self.__card

    @card.setter
    def card(self, value):
        rank, suite = value
        rank = rank.upper(); suite = suite.upper()
        try:
            rank_value = RANK_MAPPER.index(rank)
        except ValueError:
            raise Exception('Hand contains an invalid rank')

        if rank == VOID:
            raise Exception('Hand contains an invalid rank')
        if suite not in PokerSuites.list_values():
            raise Exception(f'Hand contains and invalid suite. Valid suites are {PokerSuites.list_values()}')
        self.rank = rank
        self.suite = suite
        self.value = rank_value
        self.__card = f'{rank}{SUITE_MAPPER[suite][-1]}'

    def __eq__(self, other):
        if isinstance(other, self.__class__):
            return self.value == other.value
        return NotImplemented

    def __ne__(self, other):
        if isinstance(other, self.__class__):
            return self.value != other.value
        return NotImplemented

    def __lt__(self, other):
        if isinstance(other, self.__class__):
            return self.value < other.value
        return NotImplemented

    def __ge__(self, other):
        if isinstance(other, self.__class__):
            return self.value > other.value
        return NotImplemented

    def __str__(self):
        return f'{self.card}'

    def __repr__(self):
        return f'{self.__class__.__name__}(card={self.raw_value})'
