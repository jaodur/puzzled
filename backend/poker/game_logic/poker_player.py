from itertools import combinations
from .hand import Hand


class PokerPlayer:
    def __init__(self, user_id, amount, seat):
        self.user = user_id
        self.hold_cards = None
        self.bet = 0
        self.action = None
        self.amount = amount
        self.active = True
        self.seat = seat
        self.best_hand = None

    def get_best_hand(self, community_cards, num_of_hold_cards_included=2):
        community_cards = combinations(community_cards, len(community_cards) - num_of_hold_cards_included)
        hold_cards = combinations(self.hold_cards, num_of_hold_cards_included)
        for hold_card in hold_cards:
            for cards in community_cards:
                hand = Hand(cards + hold_card, from_raw=False)
                if self.best_hand is None:
                    self.best_hand = hand
                elif hand > self.best_hand:
                    self.best_hand = hand
        return self.best_hand

    def __eq__(self, other):
        if isinstance(other, self.__class__):
            if not other.active:
                return False
            return self.best_hand == other.best_hand

        return NotImplemented

    def __ne__(self, other):
        if isinstance(other, self.__class__):
            if not other.active:
                return True
            return self.best_hand != other.best_hand

        return NotImplemented

    def __gt__(self, other):
        if isinstance(other, self.__class__):
            if not other.active:
                return False
            return self.best_hand > other.best_hand

        return NotImplemented

    def __repr__(self):
        return f'{self.__class__.__name__}(user_id={self.user}, amount={self.amount}, seat={self.seat})'


class PokerPlayers:
    def __init__(self, players):
        self._players = players
        self.active_players = self.get_active_players()

    def get_active_players(self):
        return [player for player in self._players if player.active]

    def assign_hold_cards(self, hold_cards):
        for player, holds_ in zip(self._players, hold_cards):
            player.hold_cards = holds_

    def reset_player_states(self):
        for player in self._players:
            player.active = True
            player.best_hand = None
            player.hold_cards = None

    def arrange_players(self, dealer):
        small_binder = dealer + 1
        return self.__class__(self._players[small_binder:] + self._players[:small_binder])

    def add_player(self, player, index):
        if player.user in [player.user for player in self._players]:
            raise Exception('Player already exists')
        self._players.insert(index, player)
        return True

    def remove_player(self, user_id):
        for index in range(len(self._players)):
            player = self._players[index]
            if player.user == user_id:
                self._players.remove(player)
                return player

    def __len__(self):
        return len(self._players)

    def __getitem__(self, index):
        return self._players[index]

    def __iter__(self):
        return iter(self._players)

    def __next__(self):
        return next(player for player in self._players)

    def __repr__(self):
        return f'{self.__class__.__name__}(players={repr(self._players)})'
