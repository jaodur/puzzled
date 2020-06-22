from django.contrib.auth import get_user_model
from django.db import models
from backend.lib.base import AuditableBaseModel
from .game_logic import PokerActions, PokerDeckTypes, PokerGameTypes, PokerRoundTypes

ACTION_CHOICES = (
    (PokerActions.FOLD.value, PokerActions.FOLD.value),
    (PokerActions.CALL.value, PokerActions.CALL.value),
    (PokerActions.RAISE.value, PokerActions.RAISE.value),
)

TYPE_CHOICES = (
    (PokerGameTypes.TEXAS_HOLD_EM.value, PokerGameTypes.TEXAS_HOLD_EM.value),
)
DECK_CHOICES = (
    (PokerDeckTypes.STANDARD_SINGLE.value, PokerDeckTypes.STANDARD_SINGLE.value),
)
ROUND_CHOICES = (
    (PokerRoundTypes.PRE_FLOP.value, PokerRoundTypes.PRE_FLOP.value),
    (PokerRoundTypes.FLOP.value, PokerRoundTypes.FLOP.value),
    (PokerRoundTypes.TURN.value, PokerRoundTypes.TURN.value),
    (PokerRoundTypes.RIVER.value, PokerRoundTypes.RIVER.value),
    (PokerRoundTypes.SHOWDOWN.value, PokerRoundTypes.SHOWDOWN.value),
)


class PokerPlayer(AuditableBaseModel):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    hold_cards = models.CharField(max_length=50, null=False, blank=False)
    bet = models.IntegerField(null=False, blank=False, default=0)
    action = models.CharField(max_length=50, choices=ACTION_CHOICES)


class PokerRoom(AuditableBaseModel):
    name = models.CharField(max_length=50, null=True, blank=True)
    players = models.ManyToManyField(get_user_model())
    type = models.CharField(max_length=50, null=False, blank=False, choices=TYPE_CHOICES)
    small_blind = models.IntegerField(null=False, blank=False)
    big_blind = models.IntegerField(null=False, blank=False)


class PokerHand(AuditableBaseModel):
    poker_room = models.ForeignKey(PokerRoom, on_delete=models.CASCADE)
    deck = models.CharField(max_length=200, null=False, blank=False, choices=DECK_CHOICES, default=DECK_CHOICES[0][0])
    deck_size = models.IntegerField(null=False, blank=False)
    last_round = models.CharField(max_length=50, null=False, blank=False, choices=ROUND_CHOICES)
    pot_size = models.IntegerField(null=False, blank=False)
    community_cards = models.CharField(max_length=200, null=True, blank=True)
    banned_cards = models.CharField(max_length=200, null=True, blank=True)
    players = models.ManyToManyField(PokerPlayer)
    dealer = models.IntegerField(null=False, blank=False)
