from django.apps import AppConfig


class AccountsAppConfig(AppConfig):
    name = 'accounts_app'

    def ready(self):
        from .email_scheduler import sender
        sender.start()
