from django.test import TestCase
from backend.poker import Action, HandState, PokerPlayer, PokerRoundTypes


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
