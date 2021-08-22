from django.contrib import admin
from .models import UserAccount, Service, Appointment


class AppointmentCustom(admin.ModelAdmin):
    list_display = ('client', 'appointment_time', 'service')
    list_filter = ('appointment_date',)


class UserAccountCustom(admin.ModelAdmin):
    readonly_fields = ('password', 'first_name', 'last_name', 'email')


admin.site.register(UserAccount, UserAccountCustom)
admin.site.register(Service)
admin.site.register(Appointment, AppointmentCustom)
