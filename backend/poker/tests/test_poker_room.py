from django.test import TestCase
from backend.poker import (
    Action,
    CurrentHand,
    Card,
    HandState,
    PokerPlayer,
    PokerPlayers,
    PokerRoundTypes
)


class TestAction(TestCase):

    def test_action_init_succeeds(self):
        action_type, bet = 'Raise', 10
        action = Action(action_type, bet)

        self.assertEquals(action.type, action_type)
        self.assertEquals(action.bet, bet)

    def test_handles_unknown_action_types(self):
        with self.assertRaises(Exception) as exc:
            Action(action_type='Unknown')

        self.assertEquals(str(exc.exception), 'Invalid poker action type')

    def test_action_representation(self):
        action = Action(action_type='Fold')

        self.assertEquals(repr(action), 'Action(action_type=Fold, bet=None)')


class TestHandState(TestCase):

    def test_hand_state_init_succeeds(self):
        player = PokerPlayer(user_id=1, amount=200, seat=1)
        hand_state = HandState(current_player=player, poker_round=PokerRoundTypes.PRE_FLOP)

        self.assertEquals(hand_state.current_player, player)
        self.assertEquals(hand_state.round, PokerRoundTypes.PRE_FLOP)
        self.assertEquals(hand_state.end, False)

    def test_hand_state_representation(self):
        player = PokerPlayer(user_id=1, amount=200, seat=1)
        hand_state = HandState(current_player=player, poker_round=PokerRoundTypes.PRE_FLOP)

        self.assertEquals(
            repr(hand_state),
            'HandState(current_player=PokerPlayer(user_id=1, amount=200, seat=1), '
            'poker_round=PokerRoundTypes.PRE_FLOP), end=False)'
        )


class TestCurrentHand(TestCase):

    @staticmethod
    def players():
        return PokerPlayers(
            [PokerPlayer(0, 200, 0), PokerPlayer(1, 200, 1), PokerPlayer(2, 200, 2), PokerPlayer(3, 200, 3)]
        )

    @staticmethod
    def new_current_hand(players):
        return CurrentHand(
            poker_room=1,
            type='single',
            small_blind=1,
            big_blind=2,
            players=players
        )

    def test_current_hand_init_succeeds(self):
        players = self.players()
        hand = self.new_current_hand(players=players)

        self.assertEquals(hand.deck_size, 1)
        self.assertEquals(len(hand.deck), 52)
        self.assertEquals(hand.pot.size, 0)
        self.assertEquals(hand.community_cards, [])
        self.assertEquals(hand.banned_cards, [])
        self.assertEquals(hand.small_blind, 1)
        self.assertEquals(hand.big_blind, 2)
        self.assertEquals(hand.players, players)
        self.assertEquals(hand.seat_offset, players[0].seat)
        self.assertEquals(hand.state.round, PokerRoundTypes.PRE_FLOP)
        self.assertEquals(hand.state.current_player, hand.players[hand.get_player_index(self.players()[0].seat)])

    def test_generating_hold_cards_succeeds(self):
        players = self.players()
        hand = self.new_current_hand(players=players)
        hand.generate_hold_cards()

        for player in players:
            self.assertEquals(len(player.hold_cards), 2)

    def test_get_next_player_new_round_succeeds(self):
        players = self.players()
        hand = self.new_current_hand(players=players)
        player = hand.get_next_player()

        self.assertEquals(player, players[0])

    def test_get_next_player_during_round(self):
        players = self.players()
        players[1].active = False  # emulate hand folding
        next_immediate_player = players[2]
        hand = self.new_current_hand(players=players)
        player = hand.get_next_player(new_round=False)

        self.assertEquals(player, next_immediate_player)

    def test_next_community_cards(self):
        deck_length = 52
        hand = self.new_current_hand(players=self.players())
        hand.state.round = PokerRoundTypes.FLOP

        # Flop community cards
        flop_community_cards = hand.next_community_cards()
        self.assertEquals(len(flop_community_cards), 3)
        self.assertEquals(flop_community_cards, hand.community_cards)
        self.assertEquals(len(hand.deck), deck_length - len(hand.community_cards) - len(hand.banned_cards))

        # Turn community cards
        hand.state.round = PokerRoundTypes.TURN
        turn_community_card = hand.next_community_cards()
        self.assertEquals(len(turn_community_card), 1)
        self.assertEquals(turn_community_card, hand.community_cards[-1:])
        self.assertEquals(len(hand.deck), deck_length - len(hand.community_cards) - len(hand.banned_cards))

        # River community cards
        hand.state.round = PokerRoundTypes.RIVER
        river_community_card = hand.next_community_cards()
        self.assertEquals(len(river_community_card), 1)
        self.assertEquals(river_community_card, hand.community_cards[-1:])
        self.assertEquals(len(hand.deck), deck_length - len(hand.community_cards) - len(hand.banned_cards))

        # Showdown community cards
        hand.state.round = PokerRoundTypes.SHOWDOWN
        showdown_community_card = hand.next_community_cards()
        self.assertEquals(showdown_community_card, None)

    def test_next_community_cards_handle_unknown_round(self):
        hand = self.new_current_hand(self.players())
        hand.state.round = 'unknown'
        with self.assertRaises(NotImplementedError) as exc:
            hand.next_community_cards()

        self.assertEquals(str(exc.exception), 'Round type not implemented')

    def test_set_new_round_succeeds(self):
        hand = self.new_current_hand(players=self.players())
        # test default round
        self.assertEquals(hand.state.round, PokerRoundTypes.PRE_FLOP)
        self.assertFalse(hand.state.end)

        hand.set_new_round(PokerRoundTypes.FLOP)

        self.assertEquals(hand.state.round, PokerRoundTypes.FLOP)
        self.assertFalse(hand.state.end)

        hand.set_new_round(PokerRoundTypes.SHOWDOWN)
        self.assertEquals(hand.state.round, PokerRoundTypes.SHOWDOWN)
        self.assertTrue(hand.state.end)

    def test_next_round(self):
        hand = self.new_current_hand(players=self.players())
        self.assertEquals(hand.state.round, PokerRoundTypes.PRE_FLOP)

        hand.next_round()
        self.assertEquals(hand.state.round, PokerRoundTypes.FLOP)

        hand.next_round()
        self.assertEquals(hand.state.round, PokerRoundTypes.TURN)

        hand.next_round()
        self.assertEquals(hand.state.round, PokerRoundTypes.RIVER)

        hand.next_round()
        self.assertEquals(hand.state.round, PokerRoundTypes.SHOWDOWN)
        self.assertTrue(hand.state.end)

        hand.state.end = False
        hand.next_round()
        self.assertTrue(hand.state.end)

    def test_take_action_succeeds(self):
        players = self.players()
        hand = self.new_current_hand(players=players)
        hand.generate_hold_cards()

        # Raise Action
        raise_bet = 1
        hand.take_action(hand.state.current_player.seat, Action(action_type='Raise', bet=raise_bet))
        self.assertEquals(hand.pot.size, raise_bet)
        self.assertEquals(hand.state.current_player, players[1])

        # Call Action
        hand.state.current_player = hand.get_next_player(new_round=False)
        hand.take_action(hand.state.current_player.seat, Action(action_type='Call', bet=raise_bet))
        self.assertEquals(hand.pot.size, 2 * raise_bet)
        self.assertEquals(hand.state.current_player, players[2])

        # Fold Action
        hand.state.current_player = hand.get_next_player(new_round=False)
        hand.take_action(hand.state.current_player.seat, Action(action_type='Fold'))
        self.assertEquals(hand.pot.size, 2 * raise_bet)
        self.assertEquals(hand.state.current_player, players[3])

    def test_take_action_hands_completed_hand(self):
        hand = self.new_current_hand(players=self.players())
        hand.state.end = True

        with self.assertRaises(Exception) as exc:
            hand.take_action(hand.state.current_player.seat, Action(action_type='Raise', bet=1))

        self.assertEquals(str(exc.exception), 'Hand completed, no more actions allowed')

    def test_take_action_handles_invalid_current_player(self):
        players = self.players()
        hand = self.new_current_hand(players=players)
        with self.assertRaises(Exception) as exc:
            hand.take_action(players[-1].seat, Action(action_type='Raise', bet=1))

        self.assertEquals(str(exc.exception), 'Not the current player to act')

    def test_update_state(self):
        players = self.players()
        hand = self.new_current_hand(players=players)

        # updates current player
        raise_bet = 1
        hand.take_action(hand.state.current_player.seat, Action(action_type='Raise', bet=raise_bet))
        self.assertEquals(hand.state.current_player, players[0])
        hand.update_hand_state()
        self.assertEquals(hand.state.current_player, players[1])
        self.assertEquals(hand.state.round, PokerRoundTypes.PRE_FLOP)

        # updates to new round
        for _ in range(len(players[1:])):
            hand.take_action(hand.state.current_player.seat, Action(action_type='Call', bet=raise_bet))
            hand.update_hand_state()
        self.assertEquals(hand.state.current_player, players[0])
        self.assertEquals(hand.state.round, PokerRoundTypes.FLOP)

        # checks for single active player
        hand.take_action(hand.state.current_player.seat, Action(action_type='Raise', bet=100))
        for _ in range(len(players[1:])):
            hand.take_action(hand.state.current_player.seat, Action(action_type='Fold'))
            hand.update_hand_state()

        self.assertTrue(hand.state.end)

    def test_play_hand(self):
        players = self.players()
        hand = self.new_current_hand(players=players)

        self.assertEquals(hand.state.current_player, players[0])

        hand.play_hand(hand.state.current_player.seat, Action(action_type='Raise', bet=1))

        self.assertEquals(hand.state.current_player, players[1])
        self.assertEquals(hand.pot.size, 1)

    def test_auto_blind_play(self):
        players = self.players()
        hand = self.new_current_hand(players=players)
        self.assertEquals(hand.state.current_player, players[0])

        hand.auto_blind_play()

        self.assertEquals(hand.state.current_player, players[2])
        self.assertEquals(hand.pot.size, 3)

    def test_winners_succeeds(self):
        players = self.players()
        hand = self.new_current_hand(players=players)
        hand.generate_hold_cards()

        # round 1 betting
        hand.play_hand(hand.state.current_player.seat, Action(action_type='Raise', bet=1))  # player 0
        hand.play_hand(hand.state.current_player.seat, Action(action_type='Raise', bet=2))  # player 1
        hand.play_hand(hand.state.current_player.seat, Action(action_type='Raise', bet=3))  # player 2
        hand.play_hand(hand.state.current_player.seat, Action(action_type='call', bet=3))  # player 3
        hand.play_hand(hand.state.current_player.seat, Action(action_type='call', bet=3))  # player 0
        self.assertEquals(hand.state.round, PokerRoundTypes.PRE_FLOP)

        hand.play_hand(hand.state.current_player.seat, Action(action_type='call', bet=3))  # player 1
        self.assertEquals(hand.state.round, PokerRoundTypes.FLOP)

        #  round 2 betting
        hand.play_hand(hand.state.current_player.seat, Action(action_type='Raise', bet=4))  # player 0
        hand.play_hand(hand.state.current_player.seat, Action(action_type='Raise', bet=8))  # player 1
        hand.play_hand(hand.state.current_player.seat, Action(action_type='Raise', bet=100))  # player 2

        # All other players [0, 1, 3] fold
        hand.play_hand(hand.state.current_player.seat, Action(action_type='Fold'))  # player 3
        hand.play_hand(hand.state.current_player.seat, Action(action_type='Fold'))  # player 0
        self.assertEquals(hand.state.round, PokerRoundTypes.FLOP)

        hand.play_hand(hand.state.current_player.seat, Action(action_type='Fold'))  # player 1
        self.assertEquals(hand.state.round, PokerRoundTypes.FLOP)
        self.assertTrue(hand.state.end)

        winners = hand.winners()

        self.assertEquals(winners[0], players[2])

    def test_winners_with_prefix_hands_succeeds(self):
        community_cards = [Card('KH'), Card('8H'), Card('6D'), Card('JC'), Card('TD')]
        hold_cards = [
            [Card('AC'), Card('3S')], [Card('KD'), Card('5S')], [Card('KC'), Card('5D')], [Card('QS'), Card('5H')]
        ]
        players = self.players()
        hand = self.new_current_hand(players=players)
        hand.community_cards = community_cards
        for index, hold_cards_ in enumerate(hold_cards):
            players[index].hold_cards = hold_cards_
        hand.state.end = True

        winners = hand.winners()
        self.assertEquals(len(winners), 2)
        self.assertEquals(winners[0], players[1])
        self.assertEquals(winners[1], players[2])

    def test_current_hand_representation(self):
        hand = self.new_current_hand(self.players())

        self.assertEquals(
            repr(hand),
            'CurrentHand(poker_room=1, type=single, small_blind=1, big_blind=2, '
            'players=PokerPlayers(players=[PokerPlayer(user_id=0, amount=200, seat=0), '
            'PokerPlayer(user_id=1, amount=200, seat=1), PokerPlayer(user_id=2, amount=200, seat=2), '
            'PokerPlayer(user_id=3, amount=200, seat=3)]), from_deck=None, deck_size=1)'
        )
