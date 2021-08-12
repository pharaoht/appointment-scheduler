from django.contrib import admin

# Register your models here.
from .models import UserAccount, Service, Appointment
# Register your models here.
admin.site.register(UserAccount)
admin.site.register(Service)
admin.site.register(Appointment)
