from django.db.models.signals import post_save, post_delete
from graphene_subscriptions.signals import post_save_subscription, post_delete_subscription
from .models import ChatChannel, Message

post_save.connect(post_save_subscription, sender=ChatChannel, dispatch_uid='chat.ChatChannel_post_save')
post_delete.connect(post_delete_subscription, sender=ChatChannel, dispatch_uid='chat.ChatChannel_post_delete')

post_save.connect(post_save_subscription, sender=Message, dispatch_uid='chat.Message_post_save')
post_delete.connect(post_delete_subscription, sender=Message, dispatch_uid='chat.Message_post_delete')
