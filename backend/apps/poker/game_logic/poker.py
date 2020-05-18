from reprlib import repr
from .utils import PokerSuites


class Hand:
    VOID = '-'
    SUITES = PokerSuites
    RANK_MAPPER = f'{VOID}{VOID}23456789TJQKA'

    def __init__(self, hand):
        self.rank = None
        self.suite = None
        self.name = None
        self.raw_hand = hand

    @property
    def raw_hand(self):
        return self.__raw_hand

    @raw_hand.setter
    def raw_hand(self, hand):
        rank, suite = [], []
        try:
            hand = sorted(map(str.upper, hand), key=lambda val: self.RANK_MAPPER.index(val[0]), reverse=True)
        except ValueError:
            raise Exception('invalid rank')
        for r, s in hand:
            if r == self.VOID:
                raise Exception('invalid rank')
            if s.upper() not in self.SUITES.values():
                raise Exception('invalid suite')
            rank.append(r.upper())
            suite.append(s.upper())

        self.rank = rank
        self.suite = suite
        self.__raw_hand = hand

    def rank_hand(self):
        pass

    def __repr__(self):
        return f'<Hand {self.raw_hand}>'


class Poker:
    def __init__(self, deck_size=1, wild_cards=False):
        self.deck_size = deck_size
        self.wild_cards = wild_cards
        self.hands = []

    def shuffle_deck(self):
        pass

    def generate_hands(self, num_of_hands, hand_size):
        pass

    def sort_hands(self):
        pass

    def get_winning_hands(self):
        pass

    def __iter__(self):
        return iter(self.hands)

    def __next__(self):
        return next(self.hands)

    def __len__(self):
        return len(self.hands)

    def __getitem__(self, index):
        return self.hands[index]

    def __repr__(self):
        return f'<Poker hand_size={len(self)}, hands={repr(self.hands)}>'
