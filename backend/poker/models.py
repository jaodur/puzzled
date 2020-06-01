from django.contrib.auth import get_user_model
from django.db import models
from backend.lib.base import AuditableBaseModel


class PokerPlayer(AuditableBaseModel):
    ACTION_CHOICES = (
        ('Fold', 'Fold'),
        ('Call', 'Call'),
        ('Raise', 'Raise'),
    )
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    hold_cards = models.CharField(max_length=50, null=False, blank=False)
    bet = models.IntegerField(null=False, blank=False, default=0)
    action = models.CharField(max_length=50, choices=ACTION_CHOICES)


class PokerRoom(AuditableBaseModel):
    name = models.CharField(max_length=50, null=True, blank=True)
    users = models.ManyToManyField(get_user_model())


class PokerHand(AuditableBaseModel):
    TYPE_CHOICES = (
        ('TexasHoldEm', 'TexasHoldEm'),
    )
    DECK_CHOICES = (
        ('StandardSingle', 'StandardSingle'),
    )
    ROUND_CHOICES = (
        ('PreFlop', 'PreFlop'),
        ('Flop', 'Flop'),
        ('Turn', 'Turn'),
        ('River', 'River'),
        ('Showdown', 'Showdown'),
    )

    poker_room = models.ForeignKey(PokerRoom, on_delete=models.CASCADE)
    type = models.CharField(max_length=50, null=False, blank=False, choices=TYPE_CHOICES)
    deck = models.CharField(max_length=50, null=False, blank=False, choices=DECK_CHOICES, default=DECK_CHOICES[0][0])
    last_round = models.CharField(max_length=50, null=False, blank=False, choices=ROUND_CHOICES)
    pot_size = models.IntegerField(null=False, blank=False)
    community_cards = models.CharField(max_length=50, null=True, blank=True)
    banned_cards = models.CharField(max_length=50, null=True, blank=True)
    small_blind = models.IntegerField(null=False, blank=False)
    big_blind = models.IntegerField(null=False, blank=False)
    players = models.ManyToManyField(PokerPlayer)
