from collections import Sequence
from enum import Enum
from django.core.exceptions import ImproperlyConfigured
from graphene.types.mutation import MutationOptions, get_unbound_function
from graphene_subscriptions.events import CREATED, UPDATED, DELETED
from .base_mutation import BaseMutation


class SubscriptionEventEnum(Enum):
    CREATED = CREATED
    UPDATED = UPDATED
    DELETED = DELETED

    @classmethod
    def values(cls):
        return [e.value for e in cls]


class SubscriptionOptions(MutationOptions):
    model = None
    actions = None


class BaseSubscription(BaseMutation):

    class Meta:
        abstract = True

    @classmethod
    def __init_subclass_with_meta__(cls, actions=None, model=None, _meta=None, **options):

        if not _meta:
            _meta = SubscriptionOptions(cls)

        if not model:
            raise ImproperlyConfigured("No 'model' provided in Meta")

        if not actions:
            raise ImproperlyConfigured("No 'actions' provided in Meta")

        if not isinstance(actions, Sequence):
            raise ImproperlyConfigured("actions provided is not a sequence")

        if not all(action in SubscriptionEventEnum.values() for action in actions):
            raise ImproperlyConfigured(
                f'actions sequence contain(s) invalid action(s). '
                f'Here are valid actions {SubscriptionEventEnum.values()}'
            )

        _meta.actions = actions
        _meta.model = model
        _meta.resolver = get_unbound_function(cls.mutate)

        super().__init_subclass_with_meta__(model=model, _meta=_meta, **options)

    @classmethod
    def mutate(cls, root, info, instance_id, *args, **kwargs):
        return root.filter(
            lambda event: (
                event.operation == cls._meta.actions
                and isinstance(event.instance, cls._meta.model)
                and event.instance.id == int(instance_id)
            )
        ).map(lambda event: event.instance)
