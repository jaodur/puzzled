from django.conf import settings
from django.core.mail import (
    BadHeaderError,
    EmailMessage,
    EmailMultiAlternatives,
    get_connection,
    send_mail,
    send_mass_mail
)
from .abstract_send_mail import AbstractEmail


class DjangoMail(AbstractEmail):

    @classmethod
    def send_email(cls, recipient, mail_subject, mail_body):

        try:
            send_mail(subject=mail_subject, message=mail_body,
                      from_email=settings.EMAIL_HOST_USER, recipient_list=[recipient])
        except BadHeaderError:
            pass

    @classmethod
    def send_bulk_emails(cls, recipients, mail_subject, mail_body):

        try:
            send_mass_mail((mail_subject, mail_body, settings.EMAIL_HOST_USER, recipients))
        except BadHeaderError:
            pass

    @classmethod
    def send_multiple_emails(cls, *messages):

        with get_connection() as mail_connection:
            try:
                mail_connection.send(messages)
            except BadHeaderError:
                pass

    @classmethod
    def send_email_alternative(cls, recipient, mail_subject, mail_body, alternative_mail_body, alt_type="text/html"):
        msg = EmailMultiAlternatives(mail_subject, mail_body, settings.EMAIL_HOST_USER, [recipient])
        msg.attach_alternative(alternative_mail_body, alt_type)

        try:
            msg.send()
        except BadHeaderError:
            pass

    @classmethod
    def send_template_mail(cls, recipients, mail_subject, template, template_data, template_type="html"):
        html_content = template.format(template_data)
        msg = EmailMessage(mail_subject, html_content, settings.EMAIL_HOST_USER, recipients)
        msg.content_subtype = template_type

        try:
            msg.send()
        except BadHeaderError:
            pass
