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
    # get animal object model
    animal = AnimalType.objects.get(id=request.data['animal'])
    # for foreign key constaints have to pass both service and user
    client = Appointment(client=user, animal=animal)

    if request.method == "POST":
        if len(request.data['multiservices']) == 0:
            data = {}
            data['error'] = "Por favor seleccione un servicio."
            return Response(status=status.HTTP_409_CONFLICT, data=data)

        if Appointment.objects.filter(
                appointment_date=request.data['appointment_date'], appointment_time=request.data['appointment_time']).exists():
            data = {}
            data['error'] = "Ese tiempo se toma, esto sucede cuando dos o más usuarios envían al mismo tiempo."
            return Response(status=status.HTTP_409_CONFLICT, data=data)
        serializer = AppointmentCreateSerializer(
            client, data=request.data)
        if serializer.is_valid():
            serializer.save()
            for serviceID in request.data['multiservices']:
                service = Service.objects.get(id=serviceID['id'])
                client.services.add(service)
            # logic for email confirmation
            appointment_email_success_automation(request, user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.errors)


@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def delete_appointment(request):
    id = request.data['id']
    client = request.data['client']

    try:
        appointment = Appointment.objects.get(id=id)
        day = appointment.appointment_date
        time = appointment.appointment_time
        clientInfo = UserAccount.objects.get(id=client)

    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "POST":
        operation = appointment.delete()
        data = {}
        if operation:
            appointment_email_delete_owner(clientInfo, day, time)
            appointment_email_delete_user(clientInfo.email)
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
        paginator.page_size = 5
        result_page = paginator.paginate_queryset(appointments_past, request)
        serializer = AppointmentCreateSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def get_user_appointments_future(request):

    clientID = request.data['client']

    try:
        appointments_future = Appointment.objects.filter(
            client=clientID, appointment_date__gte=datetime.today())
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "POST":
        paginator = PageNumberPagination()
        paginator.page_size = 5
        result_page = paginator.paginate_queryset(appointments_future, request)
        serializer = AppointmentCreateSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)


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
    hr_tweleve = convert12(time)

    send_mail(
        'Su cita ha sido confirmada!',
        f'Hola {user.first_name},\nSu cita está programada para el {day} a las {hr_tweleve}. \nGracias, hasta pronto! \nDel equipo de Patitas Limpias.',
        settings.EMAIL_HOST_USER,
        [user.email],
        fail_silently=False
    )


def appointment_email_delete_owner(user, day, time):
    host = 'pharaohmanson@gmail.com'
    timeStr = time.strftime("%H:%M:%S")
    d = datetime.strptime(timeStr, "%H:%M:%S")
    send_mail(
        'Alguien Canceló Su Cita.',
        f'Hola Alejandra, Un cliente cancled su cita para las {d.strftime("%I:%M %p")} el {day}',
        settings.EMAIL_HOST_USER,
        [host],
        fail_silently=False
    )


def appointment_email_delete_user(user):

    send_mail(
        'Tu Cita Ha Sido Cancelada',
        f'Este correo electrónico le informa que ha cancelado correctamente su cita.\n¡Esperamos que vuelvas a visitarnos! Ten un día maravilloso.\n \nDel equipo de Patitas Limpias. ',
        settings.EMAIL_HOST_USER,
        [user],
        fail_silently=False
    )


def convert12(str1):

    # Get Hours
    h1 = ord(str1[0]) - ord('0')
    h2 = ord(str1[1]) - ord('0')

    hh = h1 * 10 + h2

    # Finding out the Meridien of time
    # ie. AM or PM
    Meridien = ""
    if (hh < 12):
        Meridien = "AM"
    else:
        Meridien = "PM"

    hh %= 12
    converted_num = str(hh)

    return f"{converted_num}:00 {Meridien}"
