from django.test import TestCase
from backend.poker import Hand


class TestHand(TestCase):

    def test_hand_init_succeeds(self):
        hand = Hand(['ac', '5d', 'td', '8c', 'jc'])
        self.assertEquals(hand.name, None)
        self.assertEquals(hand.raw_hand, ['AC', '5D', 'TD', '8C', 'JC'])

    def test_hand_name(self):
        hand = Hand(['6d', '9d', 'td', '8c', '7c'])
        self.assertEquals(hand.name, None)
        hand.rank_hand()
        self.assertEquals(hand.name, 'Straight')

    def test_straight_card_succeeds(self):
        hand = Hand(['6d', '9d', 'td', '8c', '7c'])
        self.assertTrue(hand.straight())

    def test_not_straight_succeeds(self):
        hand = Hand(['6d', '5d', 'td', '8c', '7c'])
        self.assertFalse(hand.straight())

    def test_flush_succeeds(self):
        hand = Hand(['6d', '5d', 'td', 'ad', 'kd'])
        self.assertTrue(hand.flush())

    def test_not_flush_succeeds(self):
        hand = Hand(['6d', '5d', 'td', 'ad', 'kc'])
        self.assertFalse(hand.flush())

    def test_straight_flush(self):
        hand = Hand(['6d', '9d', 'td', '8d', '7d'])
        self.assertTrue(hand.straight_flush())

    def test_not_straight_flush(self):
        hand = Hand(['6d', '9d', 'td', '8d', '5d'])
        self.assertFalse(hand.straight_flush())

    def test_not_straight_flush_not_flush(self):
        hand = Hand(['6d', '9d', 'td', '8d', '7c'])
        self.assertFalse(hand.straight_flush())

    def test_3_kind(self):
        hand = Hand(['6d', '6c', '6h', '8d', '5d'])
        self.assertTrue(hand.kind(3))

    def test_3_kind_fails(self):
        hand = Hand(['6d', 'tc', '6c', '8d', '5d'])
        self.assertFalse(hand.kind(3))

    def test_1_kind_fails(self):
        hand = Hand(['6d', '6c', '6h', '8d', '5d'])
        self.assertRaises(Exception, hand.kind, 1)

    def test_full_house(self):
        hand = Hand(['6d', '6c', '6h', 'kd', 'kh'])
        self.assertTrue(hand.full_house())

    def test_full_house_not_3_kind(self):
        hand = Hand(['6d', '6c', '7h', 'kd', 'kh'])
        self.assertFalse(hand.full_house())

    def test_full_house_not_2_kind(self):
        hand = Hand(['6d', '6c', '6h', 'kd', 'qh'])
        self.assertFalse(hand.full_house())

    def test_2_pair(self):
        hand = Hand(['6d', '6c', '4h', 'kd', 'kh'])
        self.assertTrue(hand.pairs(2))

    def test_2_pair_second(self):
        hand = Hand(['6d', 'kc', '6h', '8d', 'kh'])
        self.assertTrue(hand.pairs(2))

    def test_2_pair_fails(self):
        hand = Hand(['6d', '6c', '4h', 'qd', 'kh'])
        self.assertFalse(hand.pairs(2))

    def test_rank_func(self):
        hand = Hand(['6d', 'kc', '6h', '8d', 'kh'])
        self.assertEquals((2, 13, 6), hand.rank_hand())


class TestHandSequenceProtocol(TestCase):

    test_hand = Hand(['6d', '6c', '4h', 'qd', 'kh'])

    def test_iteration(self):
        for index, card in enumerate(Hand(self.test_hand.raw_hand)):
            self.assertEquals(card, self.test_hand[index])

    def test_next(self):
        self.assertEquals(next(self.test_hand), self.test_hand[0])

    def test_len(self):
        self.assertEquals(len(self.test_hand), len(self.test_hand.raw_hand))

    def test_str_representation(self):
        self.assertEquals(str(self.test_hand), "['K♥', 'Q♦', '6♦', '6♣', '4♥']")

    def test_repr_representation(self):
        self.assertEquals(repr(self.test_hand), "Hand(['6D', '6C', '4H', 'QD', 'KH'])")
