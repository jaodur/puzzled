from django.conf import settings
from django.contrib.auth import get_user_model
from django.core import signing
from django.shortcuts import redirect, render
from django.views.generic import View
from backend.lib.urltools import make_absolute


class VerifyEmail(View):

    def get(self, request, signed_data, *args, **kwargs):
        try:
            signing.loads(signed_data, max_age=8 * 60 * 60)
        except signing.SignatureExpired:
            message = 'Your email confirmation link has expired. Please generate new link.'
            context = dict(message=message, redirect_url=make_absolute('/'))
            return render(self.request, 'notifications/error_notification.html', context=context)

        except signing.BadSignature:
            message = 'This email confirmation link is invalid. Please try again.'
            context = dict(message=message, redirect_url=make_absolute('/'))
            return render(self.request, 'notifications/error_notification.html', context=context)

        if self.request.user.is_anonymous:
            self.request.session['verify_email_data'] = signed_data
            return redirect(settings.LOGIN_URL)

        user = get_user_model().objects.get(id=request.user.id)

        error, message = user.confirm_email(signed_data)

        if error:
            context = dict(message=message, redirect_url=make_absolute('/'))
            return render(self.request, 'notifications/error_notification.html', context=context)

        return redirect('/')
