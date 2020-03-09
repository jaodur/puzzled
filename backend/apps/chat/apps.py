from django.apps import AppConfig


class ChatConfig(AppConfig):
    name = 'backend.apps.chat'
    label = 'chat'

    def ready(self):
        import backend.apps.chat.signals
