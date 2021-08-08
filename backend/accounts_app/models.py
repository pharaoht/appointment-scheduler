from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from phone_field import PhoneField


class UserAccountManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError(
                "Debe proporcionar un correo electrónico para crear una cuenta")

        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name,
                          last_name=last_name)

        user.set_password(password)
        user.save()


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone = phone_number = PhoneField(
        blank=True, help_text='Contact phone number')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return self.first_name + last_name

    def __str__(self):
        return self.email
