from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.signing import BadSignature, SignatureExpired
from django.core.signing import loads as unsign
from django.shortcuts import redirect, render
from django.views.generic import View
from backend.lib.urltools import make_absolute


class VerifyEmail(View):

    def get(self, request, signed_data, *args, **kwargs):
        try:
            data = unsign(signed_data, max_age=8 * 60 * 60)
        except SignatureExpired:
            message = 'Your email confirmation link has expired. Please generate new link.'
            context = dict(message=message, redirect_url=make_absolute('/'))
            return render(self.request, 'notifications/error_notification.html', context=context)

        except BadSignature:
            message = 'This email confirmation link is invalid. Please try again.'
            context = dict(message=message, redirect_url=make_absolute('/'))
            return render(self.request, 'notifications/error_notification.html', context=context)

        if self.request.user.is_anonymous:
            return redirect(settings.LOGIN_URL)

        if data['id'] != request.user.id:
            message = 'This email confirmation link is for a different account. Please try again.'
            context = dict(message=message, redirect_url=make_absolute('/'))
            return render(self.request, 'notifications/error_notification.html', context=context)

        old_email = self.request.user.email
        user_id = data['id']
        new_email = data['new_email']

        if old_email != new_email:
            message = 'The email being verified changed. Please regenerate confirmation link'
            context = dict(message=message, redirect_url=make_absolute('/'))
            return render(self.request, 'notifications/error_notification.html', context=context)

        user = get_user_model().objects.get(id=user_id)
        user.email_verified = True
        user.save(update_fields=['email_verified'])

        return redirect('/')
