from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from .models import Appointment, UserAccount, Service, AnimalType, Review
from .serializers import AppointmentCreateSerializer, ServiceCreateSerializer, AnimalCreateSerializer, ReviewsCreateSerializier, User
from rest_framework.decorators import api_view, permission_classes
from datetime import timedelta, datetime
from rest_framework.permissions import IsAuthenticated
import json
from django.core.mail import EmailMessage, send_mail
from django.conf import settings
from rest_framework.pagination import PageNumberPagination


@api_view(['POST'])
def get_appointments(request):
    # data coming back as byte, have to convert it.
    body_unicode = request.body.decode('utf-8')
    body_data = json.loads(body_unicode)
    date_find = body_data

    Appointments = Appointment.objects.filter(
        appointment_date=date_find['dateSearch'])

    serializer = AppointmentCreateSerializer(Appointments, many=True)

    return Response(status=status.HTTP_200_OK, data=serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def create_appointment(request):
    # get user object model
    user = UserAccount.objects.get(id=request.data['client'])
    # get service object model
    service = Service.objects.get(id=request.data['service'])
    # get animal object model
    animal = AnimalType.objects.get(id=request.data['animal'])
    # for foreign key constaints have to pass both service and user
    client = Appointment(client=user, service=service, animal=animal)
    if request.method == "POST":
        if Appointment.objects.filter(
                appointment_date=request.data['appointment_date'], appointment_time=request.data['appointment_time']).exists():
            data = {}
            data['error'] = "That time is taken, this happens when two or more users submit at the same time."
            return Response(status=status.HTTP_409_CONFLICT, data=data)
        serializer = AppointmentCreateSerializer(
            client, data=request.data)
        if serializer.is_valid():
            serializer.save()
            # logic for email confirmation
            appointment_email_success_automation(request, user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.errors)


@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def delete_appointment(request):
    id = request.data['appointment']
    try:
        appointment = Appointment.objects.find(id=id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "DELETE":
        operation = appointment.delete()
        data = {}
        if operation:
            data['success'] = 'delete successfull'
            return Response(status=status.HTTP_200_OK, data=data)
        else:
            data['failure'] = 'delete failed'
            return Response(status=status.HTTP_400_BAD_REQUEST, data=data)


@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def get_user_appointments_past(request):

    clientID = request.data['client']

    try:
        appointments_past = Appointment.objects.filter(
            client=clientID, appointment_date__lt=datetime.today())
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "POST":
        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(appointments_past, request)
        serializer = AppointmentCreateSerializer(result_page, many=True)
        return paginator.get_paginated_response(status=status.HTTP_200_OK, data=serializer.data)


@api_view(['GET'])
def get_services(request):
    services = Service.objects.all()
    serializer = ServiceCreateSerializer(services, many=True)

    return Response(status=status.HTTP_200_OK, data=serializer.data)


@api_view(['GET'])
def get_animals(request):
    try:
        animals = AnimalType.objects.all()
        serializer = AnimalCreateSerializer(animals, many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_reviews(request):
    try:
        reviews = Review.objects.all()
        paginator = PageNumberPagination()
        paginator.page_size = 4
        result_page = paginator.paginate_queryset(reviews, request)
        serializer = ReviewsCreateSerializier(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def create_review(request):
    user = UserAccount.objects.get(id=request.data['client'])
    client = Review(client=user)

    if request.method == "POST":
        serializer = ReviewsCreateSerializier(client, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(status=status.HTTP_200_OK, data=serializer.errors)


@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def delete_review(request):
    id = request.data['id']
    try:
        review = Review.objects.get(id=id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "POST":
        operation = review.delete()
        data = {}
        if operation:
            data['success'] = 'delete successful'
            return Response(status=status.HTTP_200_OK, data=data)
        else:
            data['failure'] = 'delete failed'
            return Response(status=status.HTTP_400_BAD_REQUEST, data=data)


# helper methods

def appointment_email_success_automation(request, user):
    # translate date time to local
    day = request.data['appointment_date']
    time = request.data['appointment_time']
    send_mail(
        'Your Appointment has been confirmed!',
        f'Hello {user.first_name},\nYour appointment is scheduled for {day} at {time}. \nThank you, see you soon!',
        settings.EMAIL_HOST_USER,
        [user.email],
        fail_silently=False
    )


def appointment_email_delete_owner(request):
    pass


def appointment_email_delete_user(request, user):
    pass
