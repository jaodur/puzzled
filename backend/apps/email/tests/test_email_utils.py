import random
from django.test import TestCase
from django.core.mail.message import EmailMessage, EmailMultiAlternatives
from backend.apps.email.utils import email_from_dict, email_to_dict


class TestEmailUtils(TestCase):

    @staticmethod
    def valid_mail_data():
        recipients = random.choice([
            ['test.email@example.com', 'test2.email@example.com'],
            ['test3.email@example.com', 'test4.email@example.com'],
            ['test5.email@example.com', 'test6.email@example.com'],
        ])

        subject = random.choice([
            'test subject1',
            'test subject2',
            'test subject3',
        ])

        body = random.choice([
            'test body1',
            'test body2',
            'test body3',
        ])

        return recipients, subject, body

    def test_email_to_dict_email_message_type(self):
        recipients, subject, body = self.valid_mail_data()

        message = EmailMessage(subject=subject, body=body, to=recipients)

        message_dict = email_to_dict(message)

        self.assertEquals(message_dict.get('subject'), subject)
        self.assertEquals(message_dict.get('body'), body)
        self.assertEquals(message_dict.get('to'), recipients)

    def test_email_to_dict_email_multi_alternatives_type(self):
        recipients, subject, body = self.valid_mail_data()
        alternative, alt_type = '<h1>This is html</h1>', 'text/html'

        message = EmailMultiAlternatives(subject=subject, body=body, to=recipients)
        message.attach_alternative(alternative, alt_type)

        message_dict = email_to_dict(message)

        self.assertEquals(message_dict.get('subject'), subject)
        self.assertEquals(message_dict.get('body'), body)
        self.assertEquals(message_dict.get('to'), recipients)
        self.assertEquals(message_dict.get('alternatives'), [(alternative, alt_type)])

    def test_unknown_message_type(self):
        recipients, subject, body = self.valid_mail_data()

        message = dict(subject=subject, body=body, recipients=recipients)

        message_dict = email_to_dict(message)

        self.assertEquals(message_dict, message)

    def test_email_from_dict_email_message_type(self):
        recipients, subject, body = self.valid_mail_data()

        message_dict = email_to_dict(EmailMessage(subject=subject, body=body, to=recipients))

        message = email_from_dict(message_dict)

        self.assertIsInstance(message, EmailMessage)
        self.assertEquals(message.subject, subject)
        self.assertEquals(message.body, body)
        self.assertEquals(message.to, recipients)

    def test_email_from_dict_email_multi_alternatives_type(self):
        recipients, subject, body = self.valid_mail_data()
        alternative, alt_type = '<h1>This is html</h1>', 'text/html'

        _msg = EmailMultiAlternatives(subject=subject, body=body, to=recipients)
        _msg.attach_alternative(alternative, alt_type)
        message_dict = email_to_dict(_msg)

        message = email_from_dict(message_dict)

        self.assertIsInstance(message, EmailMultiAlternatives)
        self.assertEquals(message.subject, subject)
        self.assertEquals(message.body, body)
        self.assertEquals(message.to, recipients)
        self.assertEquals(message.alternatives, [(alternative, alt_type)])
