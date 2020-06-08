from django.test import TestCase
from backend.poker import Card, Deck, Hand, PokerPlayer, PokerPlayers


class TestPokerPlayer(TestCase):
    USER_ID = 1
    AMOUNT = 200
    SEAT = 5
    HOLD_CARDS = [Card('4h'), Card('2d')]
    HOLD_CARDS_2 = [Card('4h'), Card('8d')]
    COMMUNITY_CARDS = [Card('td'), Card('5s'), Card('jh'), Card('2c'), Card('4d')]
    BEST_HAND = [Card('jh'), Card('4d'), Card('4h'), Card('2c'), Card('2d')]

    def players(self, equal=True):
        player1 = PokerPlayer(self.USER_ID, self.AMOUNT, self.SEAT)
        player1.hold_cards = self.HOLD_CARDS
        player2 = PokerPlayer(2, self.AMOUNT, 3)
        player2.hold_cards = self.HOLD_CARDS if equal else self.HOLD_CARDS_2
        player1.get_best_hand(self.COMMUNITY_CARDS)
        player2.get_best_hand(self.COMMUNITY_CARDS)

        return player1, player2

    def test_create_player_succeeds(self):
        player = PokerPlayer(self.USER_ID, self.AMOUNT, self.SEAT)

        self.assertEquals(player.user, self.USER_ID)
        self.assertEquals(player.amount, self.AMOUNT)
        self.assertEquals(player.seat, self.SEAT)

    def test_best_hand_succeeds(self):
        player = PokerPlayer(self.USER_ID, self.AMOUNT, self.SEAT)
        player.hold_cards = self.HOLD_CARDS
        best_hand = player.get_best_hand(self.COMMUNITY_CARDS)

        self.assertEquals(best_hand, Hand(self.BEST_HAND, from_raw=False))
        self.assertEquals(best_hand, player.best_hand)

    def test_poker_player_eq(self):
        player1, player2 = self.players()

        self.assertEquals(player1, player2)

    def test_poker_player_inactive_eq(self):
        player1, player2 = self.players()
        player2.active = False

        self.assertFalse(player1 == player2)

    def test_eq_not_implemented_succeeds(self):
        player1, _ = self.players()
        self.assertFalse(player1 == 'string')

    def test_poker_player_ne(self):
        player1, player2 = self.players(equal=False)

        self.assertNotEquals(player1, player2)

    def test_poker_player_inactive_ne(self):
        player1, player2 = self.players(equal=False)
        player2.active = False

        self.assertNotEquals(player1, player2)

    def test_ne_not_implemented_succeeds(self):
        player1, _ = self.players()
        self.assertTrue(player1 != 'string')

    def test_poker_player_gt(self):
        player1, player2 = self.players(equal=False)

        self.assertTrue(player1 > player2)

    def test_poker_player_inactive_gt(self):
        player1, player2 = self.players(equal=False)
        player2.active = False

        self.assertFalse(player1 > player2)

    def test_gt_not_implemented_succeeds(self):
        player1, _ = self.players()
        self.assertRaises(TypeError, lambda: player1 > 'string')

    def test_poker_player_representation(self):
        player = PokerPlayer(self.USER_ID, self.AMOUNT, self.SEAT)
        self.assertEquals(repr(player), 'PokerPlayer(user_id=1, amount=200, seat=5)')


class TestPokerPlayers(TestCase):

    def players(self):
        player1 = PokerPlayer(1, 200, 0)
        player2 = PokerPlayer(2, 200, 1)
        player3 = PokerPlayer(3, 200, 2)
        player4 = PokerPlayer(4, 200, 3)

        return [player1, player2, player3, player4]

    def test_players_creation_succeeds(self):
        players = PokerPlayers(self.players())

        self.assertEquals(players._players, self.players())
        self.assertEquals(len(players.active_players), len(self.players()))

    def test_arrange_players_succeeds(self):
        players = PokerPlayers(self.players())
        players = players.arrange_players(dealer=0)

        self.assertEquals(self.players()[0], players[-1])

    def test_reset_player_states_succeeds(self):
        players = PokerPlayers(self.players())
        players[0].active = False
        self.assertEquals(len(players.get_active_players()), len(players) -  1)
        players.reset_player_states()
        self.assertEquals(len(players.get_active_players()), len(players))

    def test_assign_hold_cards_succeeds(self):
        players = PokerPlayers(self.players())
        deck = Deck()
        first_serve = deck.pop_cards(num_cards=len(players))
        second_serve = deck.pop_cards(num_cards=len(players))
        hold_cards = list(zip(first_serve, second_serve))
        players.assign_hold_cards(hold_cards=hold_cards)

        for player in players:
            self.assertEquals(len(player.hold_cards), 2)

    def test_player_length(self):
        players = PokerPlayers(self.players())
        self.assertEquals(len(players), len(self.players()))

    def test_getitem_succeeds(self):
        players = PokerPlayers(self.players())
        self.assertEquals(players[0], self.players()[0])

    def test_iteration_succeeds(self):
        players = PokerPlayers(self.players())
        for index, player in enumerate(players):
            self.assertEquals(player, players[index])

    def test_next_succeeds(self):
        players = PokerPlayers(self.players())
        self.assertEquals(next(players), players[0])

    def test_representation(self):
        players = PokerPlayers(self.players())
        self.assertEquals(
            repr(players),
            'PokerPlayers(players=[PokerPlayer(user_id=1, amount=200, seat=0), '
            'PokerPlayer(user_id=2, amount=200, seat=1), PokerPlayer(user_id=3, amount=200, seat=2), '
            'PokerPlayer(user_id=4, amount=200, seat=3)])')

