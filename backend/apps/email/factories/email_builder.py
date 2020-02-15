from .abstract_send_mail import AbstractEmail
from .django_mail import DjangoMailSender


class EmailSenderMeta(type):

    def __new__(mcs, name, bases, namespaces, **kwargs):

        for attr_name, attr in namespaces.items():

            if callable(attr) and not issubclass(attr, AbstractEmail):
                raise Exception(
                    f'{attr_name} attribute must inherit from {AbstractEmail.__name__}'
                )

        return super().__new__(mcs, name, bases, namespaces)

    def __init__(cls, name, bases, namespaces, **kwargs):
        # A do nothing __init__ to ensure both __new__ and __init__ have similar signature
        super().__init__(name, bases, namespaces)

    def __call__(cls, *args, sender=None, **kwargs):

        if args:
            raise TypeError(f'Constructor for class {cls.__name__} does not accept positional arguments')

        if sender:
            klass = super().__call__(*args, **kwargs)

            sender_class = getattr(klass, sender, False)

            if not sender_class:
                raise AttributeError(f'{klass.__name__} has no attribute {sender}')

            return sender_class()

        return super().__call__(*args, **kwargs)


class EmailSender(metaclass=EmailSenderMeta):

    DJANGO_MAIL = DjangoMailSender
