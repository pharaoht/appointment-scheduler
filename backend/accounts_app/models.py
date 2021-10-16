from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(
                "Debe proporcionar un correo electrónico para crear una cuenta")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password=None, **extra_fields):

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.is_staff = True
        user.is_active = True
        user.admin = True
        user.save()
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email


class AnimalType(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Service(models.Model):
    name = models.CharField(max_length=255, unique=True)
    price = models.DecimalField(max_digits=8, decimal_places=3)
    desc = models.TextField()
    photo1 = models.ImageField(upload_to='media/', blank=True)
    photo2 = models.ImageField(upload_to='media/', blank=True)

    def __str__(self):
        return self.name


class Appointment(models.Model):
    client = models.ForeignKey(
        UserAccount, related_name='user', on_delete=models.CASCADE)
    animal = models.ForeignKey(
        AnimalType, related_name='animal', on_delete=models.CASCADE)
    appointment_date = models.DateField(auto_now=False, auto_now_add=False)
    appointment_time = models.TimeField(auto_now=False, auto_now_add=False)
    services = models.ManyToManyField(Service, blank=False)
    daycare_start_time = models.TimeField(
        auto_now=False, auto_now_add=False, blank=True, null=True)
    daycare_end_time = models.TimeField(
        auto_now=False, auto_now_add=False, blank=True, null=True)

    def servicio_solicitado(self):
        return ",".join([str(p) for p in self.services.all()])


class Review(models.Model):
    client = models.ForeignKey(
        UserAccount, related_name='author', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    desc = models.TextField()
    rating = models.IntegerField()
    date_posted = models.DateField(auto_now_add=True)
