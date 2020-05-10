from graphene_subscriptions.events import ModelSubscriptionEvent


def m2m_changed_subscription(sender, instance, action, **kwargs):
    event = ModelSubscriptionEvent(operation=action, instance=instance)
    event.send()
