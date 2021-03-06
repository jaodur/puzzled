from django.contrib.auth import get_user_model
from django.db import models
from backend.lib.base import AuditableBaseModel


class Message(AuditableBaseModel):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    message = models.TextField()

    def __repr__(self):
        return '<Message id={!r}>'.format(self.id)


class ChatChannel(AuditableBaseModel):
    TYPE_CHOICES = (
        ('Public', 'Public'),
        ('Private', 'Private'),
        ('Direct', 'Direct'),
    )

    room_id = models.CharField(max_length=150, null=False, blank=True, unique=True)
    name = models.CharField(max_length=150, null=False, blank=False, unique=True)
    type = models.CharField(max_length=50, null=False, blank=False, choices=TYPE_CHOICES)
    messages = models.ManyToManyField(Message)
    users = models.ManyToManyField(get_user_model())

    def __repr__(self):
        return '<ChatChannel id={!r}>'.format(self.id)
