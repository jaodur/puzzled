import re
from django.core.exceptions import ValidationError
from django.core.validators import URLValidator
from pytz import timezone as pytz_timezone
from pytz.exceptions import UnknownTimeZoneError


mailbox_pat = r"[-!#$%&'*+/=?^_`{}|~0-9A-Z]+(\.[-!#$%&'*+/=?^_`{}|~0-9A-Z]+)*"  # dot-atom

# max length of the domain is 249: 254 (max email length) minus one
# period, two characters for the TLD, @ sign, & one character before @.
domain_pat = r'(?:[A-Z0-9](?:[A-Z0-9-]{0,247}[A-Z0-9])?\.)+(?:[A-Z]{2,63})'
email_pat = r'@'.join((mailbox_pat, domain_pat))

# Compile the complete email regular expression
email_re = re.compile(r'^' + email_pat + r'$', re.IGNORECASE)

validate_url = URLValidator()


def validate_email(email):
    """
    Performs a few checks on the given email address to filter out any email
    addresses we don't want to record in our address books (most likely email
    addresses that are invalid, or belong to robots).
    """
    return bool(email_re.match(email))


def url_validator(url):

    try:
        validate_url(url)
    except ValidationError:
        raise ValueError('Enter a valid url')


def email_validator(email):

    if not validate_email(email):
        raise ValueError('Enter a valid email address')


def timezone_validator(timezone):
    timezone = str(timezone).replace('_', '/')
    try:
        pytz_timezone(timezone)

    except UnknownTimeZoneError:
        raise ValueError('Unknown timezone')
