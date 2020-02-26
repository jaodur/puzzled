from django.conf import settings
from django.core.mail import (
    BadHeaderError,
    EmailMultiAlternatives,
    get_connection,
    send_mail,
    send_mass_mail
)
from backend.apps.email.utils import render_template
from .abstract_send_mail import AbstractEmail


class DjangoMailSender(AbstractEmail):

    @classmethod
    def send_email(cls, recipient, mail_subject, mail_body):

        try:
            send_mail(subject=mail_subject, message=mail_body,
                      from_email=settings.EMAIL_HOST_USER, recipient_list=[recipient])
        except BadHeaderError:
            pass

    @classmethod
    def send_bulk_emails(cls, recipients, mail_subject, mail_body, *extra_messages):

        message = (mail_subject, mail_body, settings.EMAIL_HOST_USER, recipients)

        try:
            send_mass_mail((message, *extra_messages))
        except BadHeaderError:
            pass

    @classmethod
    def send_multiple_emails(cls, *messages):

        try:
            get_connection().send_messages(messages)

        except BadHeaderError:
            pass

    @classmethod
    def send_template_mail(cls, recipients, mail_subject, template, template_data, alt_type="text/html"):
        html_content, text_content = render_template(template, template_data)
        msg = EmailMultiAlternatives(mail_subject, text_content, settings.EMAIL_HOST_USER, recipients)
        msg.attach_alternative(html_content, alt_type)

        try:
            msg.send()
        except BadHeaderError:
            pass
