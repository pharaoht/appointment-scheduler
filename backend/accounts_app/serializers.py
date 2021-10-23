from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db import models
from .models import Appointment, Service, AnimalType, Review, UserAccount
from rest_framework.serializers import ModelSerializer
User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User

        fields = ('id', 'email', 'first_name',
                  'last_name', 'password')


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


class AppointmentCreateSerializer(ModelSerializer):
    services = ServiceCreateSerializer(many=True, read_only=True)

    class Meta():
        model = Appointment

        fields = [
            'id', 'appointment_date', 'appointment_time', 'services', 'animal', 'daycare_start_time', 'daycare_end_time',
        ]

        depth = 1


class ReviewsCreateSerializier(serializers.ModelSerializer):

    def validate(self, data):
        rating = data['rating']

        if(rating < 0 or rating > 5):
            raise serializers.ValidationError("Rating must be between 0 and 5")

        return data

    class Meta():
        model = Review
        client = UserCreateSerializer()

        fields = [
            'id', 'client', 'title', 'desc', 'rating', 'date_posted',
        ]

        extra_kwargs = {
            'title': {'required': True},
            'desc': {'required': True},
            'rating': {'required': True},
        }

        depth = 1
