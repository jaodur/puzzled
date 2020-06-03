from reprlib import repr
from .deck import Deck


class CurrentHand:
    def __init__(self, poker_room, type, small_blind, big_blind, players, from_deck=None, deck_size=1):
        self.poker_room = poker_room
        self.type = type
        self.deck = Deck(from_deck, deck_size)
        self.last_round = 'preflop'
        self.pot_size = 0
        self.community_cards = []
        self.banned_cards = []
        self.small_blind = small_blind
        self.big_blind = big_blind
        self.players = players


class PokerRoom:
    def __init__(self, poker_room, type, small_blind, big_blind, players, name=None, from_deck=None, deck_size=1):
        self.pot = 0
        self.small_blind = small_blind
        self.big_blind = big_blind
        self.dealer_button = 0
        self.all_players = []
        self.name = name
        self.poker_room = poker_room
        self.deck_size = deck_size
        self.current_hand = CurrentHand(poker_room, type, small_blind, big_blind, players, from_deck, deck_size)

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
