from django.conf import settings
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.core.signing import BadSignature, SignatureExpired
from django.core.signing import loads as unsign
from django.shortcuts import redirect
from django.views.generic import View


class VerifyEmail(View):

    def get(self, request, signed_data, *args, **kwargs):
        try:
            data = unsign(signed_data, max_age=8 * 60 * 60)
        except SignatureExpired:
            messages.error(self.request, 'Your email confirmation link has expired. You can try again.')
            return redirect('/settings/personal/')
        except BadSignature:
            messages.error(self.request, 'This email confirmation link is invalid. Please try again.')
            return redirect('/settings/personal/badSignature/')

        if request.user.is_anonymous:
            return redirect(settings.LOGIN_URL)

        if data['id'] != request.user.id:
            messages.error(self.request, 'This email confirmation link is for a different account. Please try again.')
            return redirect('/settings/personal/diff-ids/')

        old_email = self.request.user.email
        user_id = data['id']
        new_email = data['new_email']

        if old_email != new_email:
            messages.error(self.request, 'The email being verified changed. Please regenerate confirmation link')
            return redirect('/settings/personal/diff-email')

        user = get_user_model().objects.get(id=user_id)
        user.email_verified = True
        user.save(update_fields=['email_verified'])

        return redirect('/')
