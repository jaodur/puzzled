from django.apps import AppConfig


class GemConfig(AppConfig):
    name = 'backend.gem'
    label = 'gem'

    def ready(self):
        import backend.gem.signals  # noqa: F401
