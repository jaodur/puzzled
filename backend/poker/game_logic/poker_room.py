from itertools import combinations
from reprlib import repr
from .deck import Deck
from .hand import Hand
from .utils import PokerActions, PokerRoundTypes


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
                elif hand.rank_hand() > self.best_hand.rank_hand():
                    self.best_hand = hand
        return self.best_hand

    def __eq__(self, other):
        if isinstance(other, self.__class__):
            if not (self.active or other.active):
                return False
            return self.best_hand == other.best_hand

    def __ne__(self, other):
        if isinstance(other, self.__class__):
            if not (self.active or other.active):
                return True
            return self.best_hand != other.best_hand

    def __gt__(self, other):
        if isinstance(other, self.__class__):
            if not (self.active or other.active):
                return False
            return self.best_hand > other.best_hand

    def __repr__(self):
        return f'{self.__class__.__name__}({self.user, self.amount})'


class PokerPlayers:
    def __init__(self, players):
        self._players = players
        self.active_players = self.get_active_players()

    def get_active_players(self):
        return [player for player in self._players if player.active]

    def assign_hold_cards(self, hold_cards):
        for player, holds_ in zip(self._players, hold_cards):
            player.hold_cards = holds_

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


class HandState:
    def __init__(self, current_player, poker_round, end=False):
        self.current_player = current_player
        self.round = poker_round
        self.end = end

    def __repr__(self):
        return (f'{self.__class__.__name__}(current_player={self.current_player}, poker_round={self.round}), '
                f'end={self.end}')


class CurrentHand:
    def __init__(self, poker_room, type, small_blind, big_blind, players, dealer_button=0, from_deck=None, deck_size=1):
        self.poker_room = poker_room
        self.type = type
        self.from_deck = from_deck
        self.deck_size = deck_size
        self.deck = Deck(from_deck, deck_size)
        self.pot_size = 0
        self.dealer_button = dealer_button
        self.community_cards = []
        self.banned_cards = []
        self.small_blind = small_blind
        self.big_blind = big_blind
        self.players = players
        self.state = HandState(current_player=players[dealer_button], poker_round=PokerRoundTypes.PRE_FLOP)
        self.last_bet = 0

    def play_hand(self, player_index, action):
        self.take_action(player_index, action)
        self.update_hand_state()

    def update_hand_state(self):
        active_players = [player for player in self.players if player.active]
        if len(active_players) <= 1:
            self.state.end = True
            return
        current_bets = set(player.bet for player in self.players if player.active)
        # if len(current_bets) == 1 or len(current_bets) == 1 and self.current_player.seat == active_players[-1].seat:
        if len(current_bets) == 1:
            self.next_round()
            self.state.current_player = self.get_next_player()
            return

        self.state.current_player = self.get_next_player(new_round=False)

    def get_next_player(self, new_round=True):
        if new_round:
            active_players = [player for player in self.players if player.active]
            return active_players[0]

        current_player_index = self.state.current_player.seat
        while not self.state.end:
            player = self.players[(current_player_index + 1) % len(self.players)]
            if player.active:
                return player
            current_player_index += 1

    def next_round(self):
        if self.state.round == PokerRoundTypes.PRE_FLOP:
            self.state.round = PokerRoundTypes.FLOP
            self.next_community_cards()

        elif self.state.round == PokerRoundTypes.FLOP:
            self.state.round = PokerRoundTypes.TURN
            self.next_community_cards()

        elif self.state.round == PokerRoundTypes.TURN:
            self.state.round = PokerRoundTypes.RIVER
            self.next_community_cards()

        elif self.state.round == PokerRoundTypes.RIVER:
            self.state.round = PokerRoundTypes.SHOWDOWN
            self.next_community_cards()

        if self.state.round == PokerRoundTypes.SHOWDOWN:
            self.state.end = True

    def take_action(self, player_index, action):
        player = self.players[player_index]
        action_type = action['type']
        action_bet = action.get('bet')
        if player_index != player.seat:
            raise

        if action_type == PokerActions.CALL.value:
            player.bet = self.last_bet
            self.pot_size += self.last_bet

        elif action_type == PokerActions.RAISE.value:
            player.bet = action_bet
            self.last_bet = action_bet
            self.pot_size += self.last_bet

        elif action_type == PokerActions.FOLD.value:
            player.active = False
            self.banned_cards.append(player.hold_cards)

    def generate_hold_cards(self, hold_size=2):
        served_cards = []
        for _ in range(hold_size):
            served_cards.append(self.deck.pop_cards(num_cards=len(self.players)))

        self.players.assign_hold_cards(zip(*served_cards))

    def next_community_cards(self):
        if self.state['round'] == PokerRoundTypes.FLOP:
            self.banned_cards.append(self.deck.pop_cards(num_cards=1))
            next_community_cards = self.deck.pop_cards(num_cards=3)
            self.community_cards.extend(next_community_cards)
            return next_community_cards

        if self.state['round'] == PokerRoundTypes.TURN or self.state['round'] == PokerRoundTypes.RIVER:
            self.banned_cards.append(self.deck.pop_cards(num_cards=1))
            next_community_card = self.deck.pop_cards(num_cards=1)
            self.community_cards.append(next_community_card)
            return next_community_card

        if self.state['round'] == PokerRoundTypes.SHOWDOWN:
            return

        raise NotImplementedError

    def winners(self):
        winners = []
        for player in self.players:
            player.get_best_hand(self.community_cards)
            if not winners:
                winners.append(player)
                continue
            if player > winners[0]:
                winners = [player]
            if player == winners[0]:
                winners.append(player)
        return winners

    def redis_stringify(self):
        pass

    def __repr__(self):
        return (
            f'{self.__class__.__name__}({self.poker_room}, {self.type}, {self.small_blind}, {self.big_blind}, '
            f'{self.players}, dealer_button={self.dealer_button}, from_deck={self.from_deck}, '
            f'deck_size={self.deck_size})'
        )


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
