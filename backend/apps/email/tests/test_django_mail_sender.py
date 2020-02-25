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

    def test_send_multiple_emails(self, mock_async_task):
        mock_async_task.return_value = mock_django_q_async_send_message

        recipients1, subject1, body1 = self.valid_mail_data()
        recipients2, subject2, body2 = self.valid_mail_data()

        messages = (
            mail.EmailMessage(subject=subject1, body=body1, to=recipients1),
            mail.EmailMessage(subject=subject2, body=body2, to=recipients2),
        )

        DjangoMailSender.send_multiple_emails(*messages)

        email1 = mail.outbox[0]
        email2 = mail.outbox[1]

        self.assertEquals(subject1, email1.subject)
        self.assertEquals(body1, email1.body)
        self.assertEquals(recipients1, email1.recipients())

        self.assertEquals(subject2, email2.subject)
        self.assertEquals(body2, email2.body)
        self.assertEquals(recipients2, email2.recipients())

    def test_send_multiple_emails_handles_bad_headers(self, mock_async_task):
        mock_async_task.return_value = mock_django_q_async_send_message

        recipients1, subject1, body1 = self.invalid_mail_data()
        recipients2, subject2, body2 = self.invalid_mail_data()

        messages = (
            mail.EmailMessage(subject=subject1, body=body1, to=recipients1),
            mail.EmailMessage(subject=subject2, body=body2, to=recipients2),
        )

        DjangoMailSender.send_multiple_emails(*messages)

        self.assertRaises(IndexError, lambda: mail.outbox[0])
