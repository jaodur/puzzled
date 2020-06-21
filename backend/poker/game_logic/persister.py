from ..models import PokerRoom, PokerHand
from .poker_game import PokerGame


class PokerGamePersist:

    def __init__(self, poker_game):

        if not isinstance(poker_game, PokerGame):
            raise Exception(f'Must be an instance of {PokerGame.__name__}')

        self.room = poker_game.room
        self.room_model_obj = None

    @staticmethod
    def new_room(poker_type, small_blind, big_blind, players=(), name=None):

        """constructor for creating new room
         Args:
            poker_type (str): string representing the type of hand --such as Omaha, being played in the room.
            small_blind (int): forced bet placed by the player to the immediate left of the dealer
            big_blind (int): forced bet placed by the player to the immediate left of the small blind
            players (tuple): a tuple of poker players on the room
            name (str): name of the room
        """
        player_ids = [player.user for player in players]
        room = PokerRoom(name=name, type=poker_type, small_blind=small_blind, big_blind=big_blind, players=player_ids)
        room.save()
        return room

    def save(self):
        room = self.room_model_obj or PokerRoom.objects.get(id=self.room.poker_room)
        current_hand = room.current_hand
        hand = PokerHand(
            poker_room=room,
            deck=self._string_cards(current_hand.deck),
            deck_size=current_hand.deck_size,
            last_round=current_hand.state.poker_round.value,
            pot_size=current_hand.pot.size,
            community_cards=self._string_cards(current_hand.community_cards),
            banned_cards=self._string_cards(current_hand.banned_cards),
            players=current_hand.players,
            dealer=room.dealer
        )
        hand.save()

    @staticmethod
    def _string_cards(cards):
        return [card.raw_value for card in cards]
