from django.urls import path
from . import views

app_name = 'accounts_app'

urlpatterns = [
    path('get-appointments/', views.get_appointments),
    path('create-appointment/', views.create_appointment),
]