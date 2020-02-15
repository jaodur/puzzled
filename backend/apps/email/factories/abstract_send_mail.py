import abc


class AbstractEmail(metaclass=abc.ABCMeta):

    @classmethod
    @abc.abstractmethod
    def send_email(cls, recipient, mail_subject, mail_body):
        """Abstract method for sending an email to a single recipient

        Args:
            recipient (str): the receiving email address.
            mail_subject (str): the email subject.
            mail_body (str): the email body.

        """
        pass

    @classmethod
    @abc.abstractmethod
    def send_bulk_emails(cls, recipients, mail_subject, mail_body):
        """Abstract method for sending email to multiple recipients

        Args:
            recipients (list): the receiving email addresses.
            mail_subject (str): the email subject.
            mail_body (str): the email body.

        """
        pass

    @classmethod
    @abc.abstractmethod
    def send_multiple_emails(cls, *messages):
        """Abstract method for sending multiple email messages to different recipients

        Args:
            messages (EmailMessage): a tuple of Django EmailMessage
        """
        pass

    @classmethod
    @abc.abstractmethod
    def send_template_mail(cls, recipients, mail_subject, template, template_data, template_type="html"):
        """Abstract method for sending multiple email messages to different recipients

        Args:
            recipients (list): the receiving email addresses.
            mail_subject (str): the email subject.
            template (Undefined): a template to use for the email
            template_data (dict): key-value pairs of data to populate the template
            template_type: (str): The content-type of the template
        """
        pass

    @classmethod
    def __subclasshook__(cls, sub):
        """Method to check for subclasses and instances (including virtual sub-classes) of AbstractEmail

        :param sub (class): sub class to check
        :return: boolean True or NotImplemented
        """
        return (
            (
                hasattr(sub, 'send_email') and callable(sub.send_email) and
                hasattr(sub, 'send_bulk_emails') and callable(sub.send_bulk_emails) and
                hasattr(sub, 'send_multiple_emails') and callable(sub.send_multiple_emails) and
                hasattr(sub, 'send_template_mail') and callable(sub.send_template_mail)
             )
            or NotImplemented
        )
