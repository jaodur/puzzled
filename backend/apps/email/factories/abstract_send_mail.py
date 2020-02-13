import abc


class AbstractEmail(metaclass=abc.ABCMeta):

    @abc.abstractmethod
    def send_email(self, recipient, mail_subject, mail_body):
        """Abstract method for sending an email to a single recipient

        Args:
            recipient (str): the receiving email address.
            mail_subject (str): the email subject.
            mail_body (str): the email body.

        """
        pass

    @abc.abstractmethod
    def send_bulk_emails(self, recipients, mail_subject, mail_body):
        """Abstract method for sending email to multiple recipients

        Args:
            recipients (list): the receiving email addresses.
            mail_subject (str): the email subject.
            mail_body (str): the email body.

        """
        pass
