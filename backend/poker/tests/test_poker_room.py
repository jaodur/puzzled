from django.test import TestCase
from backend.poker import Action


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
