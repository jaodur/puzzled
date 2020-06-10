from django.test import TestCase
from backend.poker import PokerPlayer, Pot


class TestPokerPot(TestCase):
    def test_pot_creation_succeeds(self):
        pot_size = 8
        pot = Pot(pot_size)

        self.assertEquals(pot._size, pot_size)
        self.assertEquals(pot.last_bet, 0)
        self.assertEquals(pot._round_bets, {})
        self.assertEquals(pot._folded_bets, {})

    def test_pot_handles_player_bet(self):
        bet = 10
        amount = 100
        pot = Pot()
        player = PokerPlayer(user_id=1, amount=amount, seat=5)
        pot.handle_bet(player=player, bet=bet)

        self.assertEquals(pot._size, bet)
        self.assertEquals(player.bet, bet)
        self.assertEquals(player.amount, amount - bet)
        self.assertEquals(pot._round_bets[player.seat], bet)
        self.assertEquals(pot.last_bet, bet)

    def test_pot_handles_inactive_player_bet(self):
        pot = Pot()
        player = PokerPlayer(user_id=1, amount=100, seat=5)
        player.active = False
        pot.handle_bet(player=player, bet=10)

        self.assertEquals(pot._size, 0)
        self.assertEquals(pot.last_bet, 0)
        self.assertEquals(pot._round_bets, {})
        self.assertEquals(pot._folded_bets, {})

    def test_pot_fold_bet(self):
        bet = 10
        amount = 100
        pot = Pot()
        player = PokerPlayer(user_id=1, amount=amount, seat=5)
        pot.handle_bet(player=player, bet=bet)

        self.assertEquals(pot._round_bets[player.seat], bet)
        self.assertEquals(pot.last_bet, bet)

        pot.fold_bet(player=player)
        self.assertEquals(pot._round_bets, {})

    def test_pot_new_round_reset(self):
        bet = 10
        amount = 100
        pot = Pot()
        player = PokerPlayer(user_id=1, amount=amount, seat=5)
        pot.handle_bet(player=player, bet=bet)
        pot.new_round()

        self.assertEquals(pot._round_bets, {})

    def test_round_complete_false(self):
        bet = 10
        amount = 100
        pot = Pot()
        player = PokerPlayer(user_id=1, amount=amount, seat=5)
        pot.handle_bet(player=player, bet=bet)

        self.assertFalse(pot.bet_round_complete(num_active_players=2))

    def test_round_complete_True(self):
        bet = 10
        amount = 100
        pot = Pot()
        player = PokerPlayer(user_id=1, amount=amount, seat=5)
        player2 = PokerPlayer(user_id=3, amount=amount, seat=3)
        pot.handle_bet(player=player, bet=bet)
        pot.handle_bet(player=player2, bet=bet)

        self.assertTrue(pot.bet_round_complete(num_active_players=2))

    def test_pot_representation(self):
        pot = Pot()
        self.assertEquals(repr(pot), 'Pot(size=0)')
