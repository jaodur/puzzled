from reprlib import repr
from .utils import PokerHandValue, PokerSuites


class Hand:
    VOID = '-'
    SUITES = PokerSuites
    RANK_MAPPER = f'{VOID}{VOID}23456789TJQKA'
    VALUES = PokerHandValue

    def __init__(self, hand):
        self.rank = None
        self.suite = None
        self.name = None
        self.value = None
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
        return (
            self.VALUES.STRAIGHT_FLUSH if self.straight_flush() else
            self.VALUES.KIND_4 if self.kind(4) else
            self.VALUES.FULL_HOUSE if self.full_house() else
            self.VALUES.FLUSH if self.flush() else
            self.VALUES.STRAIGHT if self.straight() else
            self.VALUES.KIND_3 if self.kind(3) else
            self.VALUES.PAIRS_2 if self.pairs(2) else
            self.VALUES.KIND_2 if self.kind(2) else
            self.VALUES.HIGH_CARD
        )

    def flush(self):
        if len(set(self.suite)) == 1:
            self.value = (self.VALUES.FLUSH, self.RANK_MAPPER.index(self.rank[0]))
            return True
        return False

    def straight(self):
        for index, r in enumerate(self.rank):
            if not index:
                continue
            if self.RANK_MAPPER.index(self.rank[index]) - self.RANK_MAPPER.index(r) != 1:
                return False

        self.value = (self.VALUES.STRAIGHT, self.RANK_MAPPER.index(self.rank[0]))
        return True

    def kind(self, kind_value):
        if kind_value <= 1:
            raise

        count = 0
        current_rank = None
        for index, r in self.rank:
            if not index:
                count += 1
                continue
            elif self.rank[index] == r:
                count += 1
                current_rank = r
                continue

            if count == kind_value:
                rank_value = (
                    self.VALUES.KIND_5 if kind_value == 5 else
                    self.VALUES.KIND_4 if kind_value == 4 else
                    self.VALUES.KIND_3 if kind_value == 3 else
                    self.VALUES.KIND_2 if kind_value == 3 else
                    None
                )
                self.value = (rank_value, self.RANK_MAPPER.index(current_rank))
                return True

            count = 1

        return False

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
