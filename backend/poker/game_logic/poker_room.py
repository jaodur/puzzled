from .deck import Deck
from .poker_player import PokerPlayers
from .pot import Pot
from .utils import PokerActions, PokerRoundTypes


class Action:
    def __init__(self, action_type, bet=None):
        self.type = action_type
        self.bet = bet

    @property
    def type(self):
        return self.__type

    @type.setter
    def type(self, action_type):
        if action_type.capitalize() not in PokerActions.list_values():
            raise Exception('Invalid poker action type')

        self.__type = action_type.capitalize()

    def __repr__(self):
        return f'{self.__class__.__name__}(action_type={self.type}, bet={self.bet})'


class HandState:
    def __init__(self, current_player, poker_round, end=False):
        self.current_player = current_player
        self.round = poker_round
        self.end = end

    def __repr__(self):
        return (f'{self.__class__.__name__}(current_player={self.current_player}, poker_round={self.round}), '
                f'end={self.end})')


class CurrentHand:
    def __init__(self, poker_room, type, small_blind, big_blind, players, from_deck=None, deck_size=1):
        self.poker_room = poker_room
        self.type = type
        self.from_deck = from_deck
        self.deck_size = deck_size
        self.deck = Deck(from_deck, deck_size)
        self.pot = Pot()
        self.community_cards = []
        self.banned_cards = []
        self.small_blind = small_blind
        self.big_blind = big_blind
        self.players = players
        self.seat_offset = players[0].seat
        self.state = HandState(current_player=self.get_next_player(), poker_round=PokerRoundTypes.PRE_FLOP)

    def play_hand(self, player_seat, action):
        self.take_action(player_seat, action)
        self.update_hand_state()

    def auto_blind_play(self):
        """Auto place bets for the small_blind and big_blind players"""

        if self.state.round == PokerRoundTypes.PRE_FLOP and not self.pot.size:
            self.play_hand(self.state.current_player.seat, Action('raise', self.small_blind))
            self.play_hand(self.state.current_player.seat, Action('raise', self.big_blind))

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
        active_players = self.players.get_active_players()
        if new_round:
            return active_players[0]

        current_player_index = self.get_player_index(self.state.current_player.seat)
        num_active_players = len(active_players)
        player_count = 0
        while player_count < num_active_players:
            player = self.players[(current_player_index + 1) % len(self.players)]
            if player.active:
                return player
            current_player_index += 1
            player_count += 1

    def get_player_index(self, player_seat):
        return player_seat - self.seat_offset

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

    def take_action(self, player_seat, action):
        if self.state.end:
            raise Exception("Hand completed, no more actions allowed")

        player = self.players[self.get_player_index(player_seat)]

        if player.user != self.state.current_player.user:
            raise Exception('Not the current player to act')

        if action.type == PokerActions.CALL.value:
            self.pot.handle_bet(player, self.pot.last_bet)

        elif action.type == PokerActions.RAISE.value:
            self.pot.handle_bet(player, action.bet)

        elif action.type == PokerActions.FOLD.value:
            player.active = False
            self.pot.fold_bet(player)
            self.banned_cards.append(player.hold_cards)

    def generate_hold_cards(self, hold_size=2):
        served_cards = []
        for _ in range(hold_size):
            served_cards.append(self.deck.pop_cards(num_cards=len(self.players)))

        self.players.assign_hold_cards(zip(*served_cards))

    def next_community_cards(self):
        def get_next_community_cards(num_cards, ban_cards=1):
            self.banned_cards.extend(self.deck.ban_cards(num_cards=ban_cards))
            _next_cards = self.deck.pop_cards(num_cards=num_cards)
            self.community_cards.extend(_next_cards)
            return _next_cards

        if self.state.round == PokerRoundTypes.FLOP:
            return get_next_community_cards(num_cards=3)

        if self.state.round == PokerRoundTypes.TURN or self.state.round == PokerRoundTypes.RIVER:
            return get_next_community_cards(num_cards=1)

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
            f'{self.__class__.__name__}(poker_room={self.poker_room}, type={self.type}, '
            f'small_blind={self.small_blind}, big_blind={self.big_blind}, players={self.players}, '
            f'from_deck={self.from_deck}, deck_size={self.deck_size})'
        )


class PokerRoom:
    def __init__(self, poker_room, poker_type, small_blind, big_blind, players=(),
                 name=None, from_deck=None, deck_size=1, dealer=None):
        self.poker_room = poker_room
        self.poker_type = poker_type
        self.small_blind = small_blind
        self.big_blind = big_blind
        self.players = PokerPlayers(players)
        self.name = name
        self.from_deck = from_deck
        self.deck_size = deck_size
        self.dealer = dealer
        self.current_hand = None

    def start_new_hand(self):
        if self.current_hand is None or self.current_hand.state.end:
            self.new_hand()
            self.current_hand.auto_blind_play()

    def new_hand(self):
        if self.current_hand is None or self.current_hand.state.end:
            if self.dealer is None:
                self.dealer = 0
            else:
                self.dealer += 1

            self.players.reset_player_states()
            players = self.players.arrange_players(self.dealer)
            self.current_hand = CurrentHand(self.poker_room, self.poker_type, self.small_blind, self.big_blind,
                                            players, self.from_deck, self.deck_size)
        return self.current_hand

    def add_player(self, new_player):
        """Method that adds new player to the the poker room. The new placed in Under-The-Gun seat
        Args:
            new_player (PokerPlayer): new player to added
        """
        index = self.dealer + 3
        if self.players.add_player(player=new_player, index=index):
            self.re_arrange_seats()

    def remove_player(self, user_id):
        """Method to remove player from the poker room"""
        return self.players.remove_player(user_id=user_id)

    def re_arrange_seats(self):
        """Method to re-arrange player seats when a new player is added"""
        for index, player in enumerate(self.players):
            player.seat = index

    def __repr__(self):
        return (
            f'{self.__class__.__name__}(poker_room={self.poker_room}, type={self.poker_type}, '
            f'small_blind={self.small_blind}, big_blind={self.big_blind}, players={self.players}, name={self.name}, '
            f'from_deck={self.from_deck}, deck_size={self.deck_size}, dealer={self.dealer})'
        )
