from django.test import TestCase
from backend.poker import Card


class TestCard(TestCase):

    def test_card_initialization_succeeds(self):
        card_input = '4c'
        card = Card(card_input)
        self.assertEquals(card.rank, card_input[0])
        self.assertEquals(card.value, int(card_input[0]))
        self.assertEquals(card.card, '4♣')
        self.assertEquals(card.suite, card_input[1].upper())

    def test_invalid_rank_fails(self):
        invalid_card_input = 'bc'
        self.assertRaises(Exception, Card, invalid_card_input)

    def test_void_card_rank_fails(self):
        invalid_card_input = '-c'
        self.assertRaises(Exception, Card, invalid_card_input)

    def test_invalid_poker_suite_fails(self):
        invalid_card_input = '4b'
        self.assertRaises(Exception, Card, invalid_card_input)

    def test_eq_succeeds(self):
        self.assertTrue(Card('ac') == Card('ad'))

    def test_eq_against_other_types_fails(self):
        self.assertFalse(4 == Card('ac'))

    def test_ne_succeeds(self):
        self.assertTrue(Card('3c') != Card('ad'))

    def test_ne_against_other_types_fails(self):
        self.assertTrue(4 != Card('ac'))

    def test_lt_succeeds(self):
        self.assertTrue(Card('3c') < Card('4c'))

    def test_lt_against_other_types_fails(self):
        self.assertRaises(TypeError, lambda: Card('4c') < 5)

    def test_gt_succeeds(self):
        self.assertFalse(Card('3c') >= Card('4c'))

    def test_gt_against_other_types_fails(self):
        self.assertRaises(TypeError, lambda: Card('4c') >= 5)

    def test_str_representation(self):
        self.assertEquals(str(Card('4c')), '4♣')

    def test_repr_representation(self):
        card = Card('4c')
        self.assertEquals(repr(card), 'Card(card=4C)')
