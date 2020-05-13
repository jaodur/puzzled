from reprlib import repr


class Hand:
    def __init__(self, hand):
        self.raw_hand = hand
        self.rank = ''
        self.suite = ''

    def __repr__(self):
        return f'<Hand {self.raw_hand}>'


class Poker:
    def __init__(self, deck_size=1, wild_cards=False):
        self.deck_size = deck_size
        self.wild_cards = wild_cards
        self.hands = []

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
