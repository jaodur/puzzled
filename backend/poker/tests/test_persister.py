from django.test import TestCase
from backend.poker import CurrentHand, PokerPlayers
from backend.poker.persister import PokerGamePersist
from backend.poker.models import PokerHand


class TestHand(TestCase):

    def new_current_hand(self, room_id=None):
        poker_type, small_blind, big_blind, players = self.persistor_args()
        return CurrentHand(
            poker_room=room_id,
            type=poker_type,
            small_blind=small_blind,
            big_blind=big_blind,
            players=PokerPlayers(players)
        )

    @classmethod
    def persistor_args(cls, poker_type='texas_holdem', small_blind=1, big_blind=2, players=()):
        return (poker_type, small_blind, big_blind, players)

    def test_initialization_succeeds(self):
        args = self.persistor_args()
        Persister = PokerGamePersist(*args)

        self.assertEquals(Persister.type, args[0])
        self.assertEquals(Persister.small_blind, args[1])
        self.assertEquals(Persister.big_blind, args[2])
        self.assertEquals(Persister.players, args[3])

    def test_creating_new_room_succeeds(self):
        args = self.persistor_args()
        Persister = PokerGamePersist.new_room(*args)

        self.assertEquals(Persister.type, args[0])
        self.assertEquals(Persister.small_blind, args[1])
        self.assertEquals(Persister.big_blind, args[2])
        self.assertEquals(Persister.players, args[3])

    def test_saving_hand_succeeds(self):
        args = self.persistor_args()
        persister = PokerGamePersist.new_room(*args, current_hand=self.new_current_hand())
        persister.save()
        count = PokerHand.objects.count()
        assert count >= 1
