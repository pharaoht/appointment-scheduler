from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from django.db import models
from .models import Appointment, Service, AnimalType
from rest_framework.serializers import ModelSerializer
User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name',
                  'last_name', 'password')


class AppointmentCreateSerializer(ModelSerializer):
    class Meta():
        model = Appointment

        fields = [
            'service', 'appointment_date', 'appointment_time'
        ]

        depth = 1


class ServiceCreateSerializer(ModelSerializer):
    class Meta():
        model = Service

        fields = [
            'id', 'name', 'price', 'desc', 'photo1', 'photo2'
        ]


class AnimalCreateSerializer(ModelSerializer):
    class Meta():
        model = AnimalType

        fields = [
            'id', 'name'
        ]
