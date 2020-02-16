from django.conf.urls import url
from .views import VerifyEmail

app_name = 'authentication'

urlpatterns = [
        url(r'^verify-email/(?P<signed_data>[\w:-]+)/$', VerifyEmail.as_view(), name='verify_email'),
    ]
