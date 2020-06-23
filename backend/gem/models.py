from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models
from backend.lib.base import AuditableBaseModel


class Gem(AuditableBaseModel):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    gems = models.IntegerField(null=False, blank=False, default=settings.DEFAULT_GEMS)
