import random
from unittest.mock import patch
from django.test import TestCase
from django.core import mail
from backend.apps.email.factories.django_mail import DjangoMailSender
from .mocks import mock_django_q_async_send_message


@patch('backend.apps.email.backends.django_q.async_task')
class TestDjangoMailSender(TestCase):

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

    def invalid_mail_data(self):
        recipients, _, body = self.valid_mail_data()
        subject = 'test subject\nInjection tests'

        return recipients, subject, body

    def test_send_mail(self, mock_async_task):
        mock_async_task.return_value = mock_django_q_async_send_message

        [recipient, *other_recipients], subject, body = self.valid_mail_data()

        DjangoMailSender.send_email(recipient, subject, body)

        email = mail.outbox[0]

        self.assertEquals(subject, email.subject)
        self.assertEquals(body, email.body)
        self.assertEquals(recipient, email.recipients()[0])

    def test_send_mail_handles_bad_headers(self, mock_async_task):
        mock_async_task.return_value = mock_django_q_async_send_message

        [recipient, *other_recipients], subject, body = self.invalid_mail_data()

        DjangoMailSender.send_email(recipient, subject, body)

        self.assertRaises(IndexError, lambda: mail.outbox[0])

    def test_send_bulk_mails(self, mock_async_task):
        mock_async_task.return_value = mock_django_q_async_send_message

        recipients, subject, body = self.valid_mail_data()

        DjangoMailSender.send_bulk_emails(recipients, subject, body)

        email = mail.outbox[0]

        self.assertEquals(subject, email.subject)
        self.assertEquals(body, email.body)
        self.assertEquals(recipients, email.recipients())

    def test_send_bulk_mails_handles_bad_headers(self, mock_async_task):
        mock_async_task.return_value = mock_django_q_async_send_message

        recipients, subject, body = self.invalid_mail_data()

        DjangoMailSender.send_bulk_emails(recipients, subject, body)

        self.assertRaises(IndexError, lambda: mail.outbox[0])
