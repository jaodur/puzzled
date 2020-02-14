from .abstract_send_mail import AbstractEmail
from .django_mail import DjangoMailSender


class EmailSenderMeta(type):

    def __new__(mcs, name, bases, namespaces, **kwargs):

        for attr_name, attr in namespaces.items():
            if not issubclass(attr, AbstractEmail):
                raise Exception(
                    f'{attr_name} attribute must inherit from {AbstractEmail.__class__.__name__}'
                )

        return super().__new__(mcs, name, bases, namespaces)

    def __init__(cls, name, bases, namespaces, **kwargs):
        # A do nothing __init__ to ensure both __new__ and __init__ have similar signature
        super().__init__(name, bases, namespaces)


class EmailSender(metaclass=EmailSenderMeta):

    DJANGO_MAIL = DjangoMailSender
