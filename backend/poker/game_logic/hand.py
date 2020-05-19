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
        self.hand = None
        self.raw_hand = hand

    @property
    def raw_hand(self):
        return self.__raw_hand

    @raw_hand.setter
    def raw_hand(self, hand):
        rank, suite, beautified_hand = [], [], []
        suite_mapper = self.SUITES.get_mapper()
        try:
            hand = sorted(map(str.upper, hand), key=lambda val: self.RANK_MAPPER.index(val[0]), reverse=True)
        except ValueError:
            raise Exception('Hand contains an invalid rank')
        for r, s in hand:
            r = r.upper()
            s = s.upper()
            if r == self.VOID:
                raise Exception('Hand contains an invalid rank')
            if s not in self.SUITES.list_values():
                raise Exception(f'Hand contains and invalid suite. Valid suites are {self.SUITES.list_values()}')
            rank.append(r)
            suite.append(s)
            beautified_hand.append(f'{r}{suite_mapper[s][-1]}')

        self.rank = rank
        self.suite = suite
        self.hand = beautified_hand
        self.__raw_hand = hand

    def rank_hand(self):
        self.value = (
            self.straight_flush() or
            self.kind(4) or
            self.full_house() or
            self.flush() or
            self.straight() or
            self.kind(3) or
            self.pairs(2) or
            self.kind(2) or
            (self.VALUES.HIGH_CARD, self.RANK_MAPPER.index(self.rank[0]))
        )
        return self.value

    def straight_flush(self):
        straight = self.straight()
        if not straight:
            return False
        flush = self.flush()
        if not flush:
            return False
        return self.VALUES.STRAIGHT_FLUSH, straight[1]

    def full_house(self):
        kind_3 = self.kind(3)
        if not kind_3:
            return False
        kind_2 = self.kind(2)
        if not kind_2:
            return False
        return self.VALUES.FULL_HOUSE, kind_3[1], kind_2[1]

    def flush(self):
        if len(set(self.suite)) == 1:
            return self.VALUES.FLUSH, self.RANK_MAPPER.index(self.rank[0])
        return False

    def straight(self):
        for index, r in enumerate(self.rank):
            if not index:
                continue
            prev_rank = self.rank[index - 1]
            prev_rank_value = self.RANK_MAPPER.index(prev_rank)
            current_rank_value = self.RANK_MAPPER.index(r)
            if abs(prev_rank_value - current_rank_value) != 1:
                return False

        return self.VALUES.STRAIGHT, self.RANK_MAPPER.index(self.rank[0])

    def kind(self, kind_value):
        if kind_value <= 1:
            raise

        count = 0
        current_rank = None
        for index, r in enumerate(self.rank):
            prev_index = index - 1
            if not index:
                count += 1
                continue
            elif self.rank[prev_index] == r:
                count += 1
                current_rank = r
                continue

            if count == kind_value:
                rank_value = (
                    self.VALUES.KIND_5 if kind_value == 5 else
                    self.VALUES.KIND_4 if kind_value == 4 else
                    self.VALUES.KIND_3 if kind_value == 3 else
                    self.VALUES.KIND_2 if kind_value == 2 else
                    None
                )
                return rank_value, self.RANK_MAPPER.index(current_rank)

            count = 1

        return False

    def pairs(self, pair_value):
        count = 0
        pair_count = 0
        pairs = []

        for index, r in enumerate(self.rank):
            if not index:
                count += 1
                continue
            elif self.rank[index] == r:
                count += 1
                continue
            if count == 2:
                pairs.append(r)
                pair_count += 1
            count = 1

        if len(pairs) == pair_value:
            rank_value = (
                self.VALUES.PAIRS_2 if pair_value == 2 else
                None
            )
            return (rank_value, *pairs)
        return False

    def __repr__(self):
        return f'<Hand {self.raw_hand}>'
