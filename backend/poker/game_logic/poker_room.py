from reprlib import repr
from .deck import Deck
from .pot import Pot
from .utils import PokerActions, PokerRoundTypes


class HandState:
    def __init__(self, current_player, poker_round, end=False):
        self.current_player = current_player
        self.round = poker_round
        self.end = end

    def __repr__(self):
        return (f'{self.__class__.__name__}(current_player={self.current_player}, poker_round={self.round}), '
                f'end={self.end})')


class CurrentHand:
    def __init__(self, poker_room, type, small_blind, big_blind, players, dealer_button=0, from_deck=None, deck_size=1):
        self.poker_room = poker_room
        self.type = type
        self.from_deck = from_deck
        self.deck_size = deck_size
        self.deck = Deck(from_deck, deck_size)
        self.pot = Pot()
        self.dealer_button = dealer_button
        self.community_cards = []
        self.banned_cards = []
        self.small_blind = small_blind
        self.big_blind = big_blind
        self.players = players
        self.state = HandState(current_player=players[dealer_button], poker_round=PokerRoundTypes.PRE_FLOP)

    def play_hand(self, player_index, action):
        self.take_action(player_index, action)
        self.update_hand_state()

    def update_hand_state(self):
        active_players = [player for player in self.players if player.active]
        num_active_players = len(active_players)

        if num_active_players <= 1:
            self.state.end = True
            return

        if self.pot.bet_round_complete(num_active_players=num_active_players):
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
        return (
            self.set_new_round(PokerRoundTypes.FLOP) if self.state.round == PokerRoundTypes.PRE_FLOP else
            self.set_new_round(PokerRoundTypes.TURN) if self.state.round == PokerRoundTypes.FLOP else
            self.set_new_round(PokerRoundTypes.RIVER) if self.state.round == PokerRoundTypes.TURN else
            self.set_new_round(PokerRoundTypes.SHOWDOWN) if self.state.round == PokerRoundTypes.RIVER else
            self.end_hand()
        )

    def set_new_round(self, new_round):
        self.state.round = new_round
        self.next_community_cards()
        self.pot.new_round()
        if new_round == PokerRoundTypes.SHOWDOWN:
            self.end_hand()

    def end_hand(self):
        self.state.end = True

    def take_action(self, player_index, action):
        player = self.players[player_index]
        action_type = action['type']
        action_bet = action.get('bet')
        if player_index != player.seat:
            raise

        if action_type == PokerActions.CALL.value:
            self.pot.handle_bet(player, self.pot.last_bet)

        elif action_type == PokerActions.RAISE.value:
            self.pot.handle_bet(player, action_bet)

        elif action_type == PokerActions.FOLD.value:
            player.active = False
            self.pot.fold_bet(player)
            self.banned_cards.append(player.hold_cards)

    def generate_hold_cards(self, hold_size=2):
        served_cards = []
        for _ in range(hold_size):
            served_cards.append(self.deck.pop_cards(num_cards=len(self.players)))

        self.players.assign_hold_cards(zip(*served_cards))

    def next_community_cards(self):
        if self.state.round == PokerRoundTypes.FLOP:
            self.banned_cards.append(self.deck.pop_cards(num_cards=1))
            next_community_cards = self.deck.pop_cards(num_cards=3)
            self.community_cards.extend(next_community_cards)
            return next_community_cards

        if self.state.round == PokerRoundTypes.TURN or self.state.round == PokerRoundTypes.RIVER:
            self.banned_cards.append(self.deck.pop_cards(num_cards=1))
            next_community_card = self.deck.pop_cards(num_cards=1)
            self.community_cards.append(next_community_card)
            return next_community_card

        if self.state.round == PokerRoundTypes.SHOWDOWN:
            return

        raise NotImplementedError

    def winners(self):
        winners = []
        for player in self.players:
            player.get_best_hand(self.community_cards)
            if not winners:
                if player.active:
                    winners.append(player)

            elif player > winners[0]:
                winners = [player]

            elif player == winners[0]:
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
