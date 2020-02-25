from unittest.mock import patch
from django.test import TestCase
from django.core import mail
from backend.apps.email.factories.django_mail import DjangoMailSender
from .mocks import mock_django_q_async_send_message


@patch('backend.apps.email.backends.django_q.async_task')
class TestDjangoMailSender(TestCase):

    def test_send_mail(self, mock_async_task):
        mock_async_task.return_value = mock_django_q_async_send_message

        recipient = 'test.email@example.com'
        subject = 'test subject'
        body = 'test body'

        DjangoMailSender.send_email(recipient, subject, body)

        email = mail.outbox[0]

        self.assertEquals(subject, email.subject)
        self.assertEquals(body, email.body)
        self.assertEquals(recipient, email.recipients()[0])

    def test_send_mail_handles_bad_headers(self, mock_async_task):
        mock_async_task.return_value = mock_django_q_async_send_message

        recipient = 'test.email@example.com'
        subject = 'test subject\nInjection tests'
        body = 'test body'

        DjangoMailSender.send_email(recipient, subject, body)

        self.assertRaises(IndexError, lambda: mail.outbox[0])
