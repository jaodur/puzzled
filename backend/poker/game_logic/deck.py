import random
from reprlib import repr
from .card import Card, RANKS, SUITES


class Deck:

    def __init__(self, from_deck=None, deck_size=1):
        self.deck_size = deck_size
        self.from_deck = from_deck
        if not from_deck:
            self._cards = [Card(f'{rank}{suite}') for _ in range(deck_size) for rank in RANKS for suite in SUITES]
            self._banned_cards = []
            self.shuffle()
        else:
            cards, banned_cards = from_deck
            self._cards = [Card(f'{rank}{suite}') for rank, suite in cards.strip().split()]
            self._banned_cards = [Card(f'{rank}{suite}') for rank, suite in banned_cards.strip().split()]

    def pop_cards(self, num_cards=1):
        if len(self) < num_cards:
            raise Exception("Few cards to pop from")
        if num_cards <= 1:
            return [self._cards.pop()]
        return [self._cards.pop() for _ in range(num_cards)]

    def ban_cards(self, num_cards=1):
        _banned_cards = self.pop_cards(num_cards=num_cards)
        self._banned_cards.extend(_banned_cards)
        return _banned_cards

    def extract(self):
        return [' '.join(c.raw_value for c in self._cards), ' '.join(c.raw_value for c in self._banned_cards)]

    def shuffle(self):
        random.shuffle(self._cards)

    def __len__(self):
        return len(self._cards)

    def __next__(self):
        return next(card for card in self._cards)

    def __iter__(self):
        return iter(self._cards)

    def __getitem__(self, index):
        return self._cards[index]

    def __repr__(self):
        return f'{self.__class__.__name__}(from_deck={repr(self.from_deck)}, deck_size={self.deck_size})'
