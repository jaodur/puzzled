from .card import Card
from .utils import PokerHandValue, PokerHandName


class Hand:
    VALUES = PokerHandValue
    NAMES = PokerHandName.get_mapper()

    def __init__(self, hand):
        self.name = None
        self.value = None
        self.hand = None
        self.raw_hand = hand

    @property
    def raw_hand(self):
        return self.__raw_hand

    @raw_hand.setter
    def raw_hand(self, hand):
        self.hand = sorted([Card(card) for card in  hand], reverse=True)
        self.__raw_hand = [card.upper() for card in hand]

    def rank_hand(self):
        if not self.value:
            self.value = (
                self.straight_flush() or
                self.kind(4) or
                self.full_house() or
                self.flush() or
                self.straight() or
                self.kind(3) or
                self.pairs(2) or
                self.kind(2) or
                (self.VALUES.HIGH_CARD.value, self[0].value)
            )
            self.name = self.NAMES.get(self.value[0])
        return self.value

    def straight_flush(self):
        straight = self.straight()
        if not straight:
            return False
        flush = self.flush()
        if not flush:
            return False
        return self.VALUES.STRAIGHT_FLUSH.value, straight[1]

    def full_house(self):
        kind_3 = self.kind(3)
        if not kind_3:
            return False
        kind_2 = self.kind(2)
        if not kind_2:
            return False
        return self.VALUES.FULL_HOUSE.value, kind_3[1], kind_2[1]

    def flush(self):
        suites = [card.suite for card in self]
        if len(set(suites)) == 1:
            first_card = self[0]
            return self.VALUES.FLUSH.value, first_card.value
        return False

    def straight(self):
        for index, card in enumerate(self):
            if not index:
                continue
            prev_card = self[index - 1]
            if abs(prev_card.value - card.value) != 1:
                return False
        first_card = self[0]
        return self.VALUES.STRAIGHT.value, first_card.value

    def kind(self, kind_value):
        if kind_value <= 1:
            raise Exception('Value must be greater than 1')

        count = 0
        current_card = None
        kind_found = False
        for index, card in enumerate(self):
            prev_index = index - 1
            if not index:
                count += 1
                continue
            elif self[prev_index].rank == card.rank:
                count += 1
                current_card = card
                continue

            if count == kind_value:
                kind_found = True
                break

            count = 1

        if kind_found or count == kind_value:
            rank_value = (
                self.VALUES.KIND_5 if kind_value == 5 else
                self.VALUES.KIND_4 if kind_value == 4 else
                self.VALUES.KIND_3 if kind_value == 3 else
                self.VALUES.KIND_2 if kind_value == 2 else
                None
            )
            return rank_value.value, current_card.value

        return False

    def pairs(self, pair_value):
        count = 0
        pair_count = 0
        pairs = []

        for index, card in enumerate(self):
            prev_index = index - 1
            if not index:
                count += 1
                continue
            elif self[prev_index].rank == card.rank:
                count += 1
                if count == 2:
                    pairs.append(self[prev_index].value)
                    pair_count += 1
                    continue
            count = 1

        if len(pairs) == pair_value:
            rank_value = (
                self.VALUES.PAIRS_2 if pair_value == 2 else
                None
            )
            return (rank_value.value, *pairs)
        return False

    def __eq__(self, other):
        if isinstance(other, self.__class__):
            self.rank_hand()
            other.rank_hand()
            if self.value != other.value:
                return False
            rank = [card.rank for card in self]
            rank_other = [card.rank for card in other]
            return rank == rank_other

        return NotImplemented

    def __ne__(self, other):
        if isinstance(other, self.__class__):
            self.rank_hand()
            other.rank_hand()
            rank = [card.rank for card in self]
            rank_other = [card.rank for card in other]
            return self.value != other.value and rank != rank_other

        return NotImplemented

    def __gt__(self, other):
        if isinstance(other, self.__class__):
            value = list(self.rank_hand())
            value_other = list(other.rank_hand())
            value.extend([card.rank for card in self])
            value_other.extend([card.rank for card in other])

            return value > value_other

        return NotImplemented

    def __getitem__(self, index):
        return self.hand[index]

    def __next__(self):
        return next(card for card in self.hand)

    def __iter__(self):
        return iter(self.hand)

    def __len__(self):
        return len(self.hand)

    def __str__(self):
        return f'{[str(card) for card in self]}'

    def __repr__(self):
        return f'{self.__class__.__name__}({self.raw_hand})'
