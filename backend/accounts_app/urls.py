from django.urls import path
from . import views

app_name = 'accounts_app'

urlpatterns = [
    path('get-appointments/', views.get_appointments),
    path('create-appointment/', views.create_appointment),
    path('delete-appointment/', views.delete_appointment),
    path('get-services/', views.get_services),
    path('get-animals/', views.get_animals),
    path('get-reviews/', views.get_reviews),
    path('delete-review/', views.delete_review),
    path('create-review/', views.create_review),
    path('get-user-appointments-past/', views.get_user_appointments_past),
    path('get-user-appointments-future/', views.get_user_appointments_future),
    path('create-daycare-appointment/', views.create_daycare_appointment),

]
