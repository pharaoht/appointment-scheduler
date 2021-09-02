from django.contrib import admin
from .models import UserAccount, Service, Appointment, AnimalType, Review


class AppointmentCustom(admin.ModelAdmin):
    list_display = ('client', 'appointment_time',
                    'service', 'appointment_date', 'animal')
    list_filter = ('appointment_date', 'service', 'client',)


class UserAccountCustom(admin.ModelAdmin):
    readonly_fields = ('password', 'first_name', 'last_name', 'email')


class ReviewCustom(admin.ModelAdmin):
    list_display = ('client', 'title', 'date_posted', 'rating')
    list_filter = ('date_posted', 'client')


admin.site.register(UserAccount, UserAccountCustom)
admin.site.register(Service)
admin.site.register(Appointment, AppointmentCustom)
admin.site.register(AnimalType)
admin.site.register(Review, ReviewCustom)
