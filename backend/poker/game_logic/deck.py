import random
from .card import Card, RANKS, SUITES


class Deck:

    def __init__(self, deck_size=1):
        self.deck_size = deck_size
        self._cards = [Card(f'{rank}{suite}') for _ in range(deck_size) for rank in RANKS for suite in SUITES]
        self._banned_cards = []
        random.shuffle(self._cards)

    def pop_cards(self, num_cards=1):
        if len(self) < num_cards:
            raise Exception("Few cards to pop from")
        if num_cards <= 1:
            return self._cards.pop()
        return [self._cards.pop() for _ in range(num_cards)]

    def ban_card(self):
        self._banned_cards.append(self.pop_cards())

    def __len__(self):
        return len(self._cards)

    def __next__(self):
        return next(card for card in self._cards)

    def __iter__(self):
        return iter(self._cards)

    def __getitem__(self, index):
        return self._cards[index]

    def __repr__(self):
        return f'{self.__class__.__name__}(deck_size={self.deck_size})'
