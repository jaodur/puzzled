from django.conf import settings
from django.urls import reverse
from six.moves.urllib.parse import urljoin


def make_absolute(relative_url):
    """Make a relative URL absolute."""
    return urljoin(settings.BASE_URL, relative_url)


def reverse_absolute(viewname, urlconf=None, args=None, kwargs=None):
    """
    Like Django's famous reverse(), but returns an absolute URL.

    This makes the result usable in emails, for example.
    """
    relative_url = reverse(viewname, urlconf=urlconf, args=args, kwargs=kwargs)
    return make_absolute(relative_url)
