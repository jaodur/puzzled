from django.test import TestCase
from backend.poker import Deck


class TestDeck(TestCase):
    SINGLE_DECK_SIZE = 52

    def test_deck_creation_succeeds(self):
        deck = Deck()
        self.assertEquals(deck.deck_size, 1)
        self.assertEquals(deck._banned_cards, [])

    def test_deck_creation_from_deck_succeeds(self):
        deck_original = Deck()
        deck = Deck(from_deck=deck_original.extract())

        self.assertEquals(deck_original._cards, deck._cards)
        self.assertEquals(deck_original._banned_cards, deck._banned_cards)

    def test_deck_length(self):
        deck = Deck()
        self.assertEquals(len(deck), self.SINGLE_DECK_SIZE)

    def test_popping_single_card_succeeds(self):
        num_of_popped_cards = 1
        remaining_cards = self.SINGLE_DECK_SIZE - num_of_popped_cards
        deck = Deck()
        popped_card = deck.pop_cards()

        self.assertEquals(len(popped_card), num_of_popped_cards)
        self.assertEquals(len(deck), remaining_cards)

    def test_popping_multiple_cards_succeeds(self):
        num_of_popped_cards = 5
        remaining_cards = self.SINGLE_DECK_SIZE - num_of_popped_cards
        deck = Deck()
        popped_cards = deck.pop_cards(num_cards=num_of_popped_cards)

        self.assertEquals(len(popped_cards), num_of_popped_cards)
        self.assertEquals(len(deck), remaining_cards)

    def test_handles_popping_from_fewer_cards(self):
        deck = Deck()

        self.assertRaises(Exception, deck.pop_cards, 55)

    def test_banning_cards(self):
        num_banned_cards = 5
        remaining_cards = self.SINGLE_DECK_SIZE - num_banned_cards
        deck = Deck()
        banned_cards = deck.ban_cards(num_cards=num_banned_cards)

        self.assertEquals(len(banned_cards), num_banned_cards)
        self.assertEquals(len(deck._banned_cards), num_banned_cards)
        self.assertEquals(len(deck), remaining_cards)

    def test_getitems_succeeds(self):
        deck = Deck()
        self.assertEquals(deck[5], deck._cards[5])

    def test_iteration(self):
        deck = Deck()
        for index, card in enumerate(deck):
            self.assertEquals(card, deck[index])

    def test_next(self):
        deck = Deck()
        self.assertEquals(next(deck), deck[0])

    def test_deck_representation(self):
        deck = Deck()
        self.assertEquals(repr(deck), 'Deck(from_deck=None, deck_size=1)')
