from django.test import TestCase
import pytest
from backend.apps.email.factories.email_builder import DjangoMailSender, EmailSender, EmailSenderMeta


class TestEmailSenderMeta(TestCase):

    def test_meta_checks_abstract_methods(self):

        with pytest.raises(Exception) as error:
            class TestEmailSender(metaclass=EmailSenderMeta):

                def TEST_SENDER(self):
                    return 'INVALID_SENDER'

        self.assertEquals(error.value.args[0], 'TEST_SENDER attribute must inherit from AbstractEmail')

    def test_meta_does_not_support_args(self):

        with pytest.raises(Exception) as error:
            EmailSender('THIS_IS_AN_ARG')

        self.assertEquals(
            error.value.args[0],
            'Constructor for class EmailSender does not accept positional arguments'
        )

    def test_meta_returns_instance_of_sender(self):

        sender = EmailSender(sender='DJANGO_MAIL')

        self.assertIsInstance(sender, DjangoMailSender)

    def test_meta_captures_unknown_senders(self):

        with pytest.raises(AttributeError) as error:
            EmailSender(sender='UNKNOWN_SENDER')

        self.assertEquals(error.value.args[0], 'EmailSender has no attribute UNKNOWN_SENDER')

    def test_meta_handles_empty_args_and_kwargs(self):

        non_specialized_sender = EmailSender()

        self.assertIsInstance(non_specialized_sender, EmailSender)
