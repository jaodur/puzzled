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


class HandComparisonTest(TestCase):
    royal_flush = Hand(['as', 'ks', 'qs', 'js', 'ts'])
    straight_flush = Hand(['kc', 'qc', 'jc', 'tc', '9c'])
    straight_flush_less = Hand(['qd', 'jd', 'td', '9d', '8d'])
    straight_flush_wheeler = Hand(['5d', '4d', '3d', '2d', 'ad'])
    kind_4 = Hand(['as', 'ad', 'ac', 'ah', 'kh'])
    kind_4_less = Hand(['tc', 'td', 'th', 'ts', 'kh'])
    full_house = Hand(['as', 'ad', 'ac', 'kd', 'kh'])
    full_house_less = Hand(['as', 'ac', 'kd', 'kc', 'kh'])
    flush = Hand(['kh', '9h', '8h', '4h', '2h'])
    flush_less = Hand(['th', '9h', '8h', '5h', '2h'])
    straight = Hand(['9d', '8c', '7c', '6s', '5h'])
    straight_less = Hand(['4d', '8c', '7c', '6s', '5h'])
    kind_3 = Hand(['9d', '8c', '7c', '7s', '7h'])
    kind_3_less = Hand(['9d', '8c', '2c', '2s', '2h'])
    pairs_2 = Hand(['9d', '9c', '7c', '7s', 'ah'])
    pairs_2_less = Hand(['9d', '9c', '7c', '7s', '2h'])
    pairs_1 = Hand(['9d', '9c', '5c', '7s', 'ah'])
    pairs_1_less = Hand(['td', 'qc', '4c', '4s', 'ah'])
    high_card = Hand(['9d', 'tc', 'jc', '7s', 'ah'])
    high_card_less = Hand(['2d', 'tc', 'jc', '7s', 'ah'])

    def test_greater_than_hands(self):
        self.assertFalse(self.royal_flush > self.royal_flush)
        self.assertTrue(self.royal_flush > self.straight_flush)
        self.assertTrue(self.straight_flush > self.straight_flush_less)
        self.assertTrue(self.straight_flush_less > self.kind_4)
        self.assertTrue(self.kind_4 > self.kind_4_less)
        self.assertTrue(self.kind_4_less > self.full_house)
        self.assertTrue(self.full_house > self.full_house_less)
        self.assertTrue(self.full_house_less > self.flush)
        self.assertTrue(self.flush > self.flush_less)
        self.assertTrue(self.flush_less > self.straight)
        self.assertTrue(self.straight > self.straight_less)
        self.assertTrue(self.straight_less > self.kind_3)
        self.assertTrue(self.kind_3 > self.kind_3_less)
        self.assertTrue(self.kind_3_less > self.pairs_2)
        self.assertTrue(self.pairs_2 > self.pairs_2_less)
        self.assertTrue(self.pairs_2_less > self.pairs_1)
        self.assertTrue(self.pairs_1 > self.pairs_1_less)
        self.assertTrue(self.pairs_1_less > self.high_card)
        self.assertTrue(self.high_card > self.high_card_less)

    def test_gt_not_implemented(self):
        self.assertRaises(TypeError, lambda: self.royal_flush > ['ad', 'kd', 'qd', 'jd', 'td'])

    def test_wheel_straight_flush(self):
        self.assertTrue(self.straight_flush_wheeler > self.kind_4)

    def test_less_than_hands(self):
        self.assertFalse(self.royal_flush < self.straight_flush)
        self.assertFalse(self.straight_flush < self.straight_flush_less)
        self.assertFalse(self.straight_flush_less < self.kind_4)
        self.assertFalse(self.kind_4 < self.kind_4_less)
        self.assertFalse(self.kind_4_less < self.full_house)
        self.assertFalse(self.full_house < self.full_house_less)
        self.assertFalse(self.full_house_less < self.flush)
        self.assertFalse(self.flush < self.flush_less)
        self.assertFalse(self.flush_less < self.straight)
        self.assertFalse(self.straight < self.straight_less)
        self.assertFalse(self.straight_less < self.kind_3)
        self.assertFalse(self.kind_3 < self.kind_3_less)
        self.assertFalse(self.kind_3_less < self.pairs_2)
        self.assertFalse(self.pairs_2 < self.pairs_2_less)
        self.assertFalse(self.pairs_2_less < self.pairs_1)
        self.assertFalse(self.pairs_1 < self.pairs_1_less)
        self.assertFalse(self.pairs_1_less < self.high_card)
        self.assertFalse(self.high_card < self.high_card_less)
        self.assertFalse(self.royal_flush < self.royal_flush)

    def test_equal_hands(self):
        self.assertTrue(self.royal_flush == Hand(['ad', 'kd', 'qd', 'jd', 'td']))
        self.assertFalse(self.royal_flush == ['ad', 'kd', 'qd', 'jd', 'td'])
        self.assertFalse(self.royal_flush == self.flush)
        self.assertTrue(self.straight_flush_wheeler == self.straight_flush_wheeler)

    def test_no_equal_hands(self):
        self.assertFalse(self.straight_flush_wheeler != self.straight_flush_wheeler)
        self.assertTrue(self.straight_flush_wheeler != self.straight_flush)
        self.assertTrue(self.straight_flush_wheeler != ['kc', 'qc', 'jc', 'tc', '9c'])

    def test_high_kicker_gt(self):
        self.assertTrue(Hand(['4c', '6d', '2d', '6c', 'ac']) > Hand(['kh', '4c', '6d', '2d', '6c']))


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
