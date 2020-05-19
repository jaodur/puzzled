from django.apps import AppConfig


class ChatConfig(AppConfig):
    name = 'backend.chat'
    label = 'chat'

    def ready(self):
        import backend.chat.signals  # noqa: F401
