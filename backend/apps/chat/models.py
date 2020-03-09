from django.contrib.auth import get_user_model
from django.db import models
from backend.lib.base import AuditableBaseModel


class Message(AuditableBaseModel):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    message = models.TextField()


class ChatChannel(AuditableBaseModel):
    TYPE_CHOICES = (
        ('Public', 'Public'),
        ('Private', 'Private'),
        ('Direct', 'Direct'),
    )

    name = models.CharField(max_length=50, null=False, blank=False, unique=True)
    type = models.CharField(max_length=50, null=False, blank=False, choices=TYPE_CHOICES)
    messages = models.ManyToManyField(Message)
    users = models.ManyToManyField(get_user_model())
