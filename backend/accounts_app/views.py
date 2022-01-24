from rest_framework.decorators import api_view, permission_classes
from django.template.loader import get_template, render_to_string
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from django.core.mail import EmailMessage, send_mail
from django.template.loader import get_template
from datetime import timedelta, datetime, date
from rest_framework.response import Response
from collections import OrderedDict
from rest_framework import status
from django.conf import settings
from .serializers import *
from .models import *
import json


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
    data = {}
    # get user object model
    user = UserAccount.objects.get(id=request.data['client'])
    # get animal object model
    animal = AnimalType.objects.get(id=request.data['animal'])
    # for foreign key constaints have to pass both service and user
    client = Appointment(client=user, animal=animal)

    if request.method == "POST":
        if len(request.data['multiservices']) == 0:
            data['error'] = "Por favor seleccione un servicio."
            return Response(status=status.HTTP_409_CONFLICT, data=data)

        if Appointment.objects.filter(
                appointment_date=request.data['appointment_date'], appointment_time=request.data['appointment_time']).exists():

            data['error'] = "Ese tiempo se toma, esto sucede cuando dos o más usuarios envían al mismo tiempo."
            return Response(status=status.HTTP_409_CONFLICT, data=data)

        serializer = AppointmentCreateSerializer(client, data=request.data)

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
def create_daycare_appointment(request):
    data = {}
    try:
        user = UserAccount.objects.get(id=request.data['client'])
        animal = AnimalType.objects.get(id=request.data['animal'])
        client = Daycare(client=user, animal=animal)
    except:

        data['errors'] = "La información que ingresó. No coincide con ninguno de nuestros registros."
        return Response(status=status.HTTP_400_BAD_REQUEST, data=data)

    if request.method == "POST":
        if Daycare.objects.filter(client=request.data['client'], appointment_date=request.data['appointment_date']).exists():
            data['errors'] = "Solo puede reservar 1 cita de guardería por día."
            return Response(status=status.HTTP_400_BAD_REQUEST, data=data)

        serializer = DaycareCreateSerializier(client, data=request.data)

        if serializer.is_valid():
            serializer.save()
            daycare_appointment_email(request.data, user)
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
            client=clientID, appointment_date__gte=datetime.now()).order_by('appointment_date')
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
    day = request.data['appointment_date'].split('-')
    convertedDate = f'{day[2]}-{day[1]}-{day[0]}'

    time = request.data['appointment_time']
    hr_tweleve = convert12(time)
    if hr_tweleve == '0:00 PM':
        hr_tweleve = '12:00 PM'

    send_mail(
        'Su cita ha sido confirmada!',
        f'Hola {user.first_name},\nSu cita está programada para el {convertedDate} a las {hr_tweleve}. \nGracias, hasta pronto! \nDel equipo de Patitas Limpias.',
        settings.EMAIL_HOST_USER,
        [user.email],
        fail_silently=False
    )


def daycare_appointment_email(info, user):
    start_time = convert12(info['start_time'])
    if start_time == '0:00 PM':
        start_time = '12:00 PM'

    end_time = convert12(info['end_time'])
    if end_time == '0:00 PM':
        end_time = '12:00 PM'

    day1 = info['appointment_date'].split('-')
    convertedDate = f'{day1[2]}-{day1[1]}-{day1[0]}'

    send_mail(
        'Su cita ha sido confirmada!',
        f'Hola {user.first_name}, \nSu cita en la guardería ha sido confirmada para el {convertedDate} a las {start_time} - {end_time}. \nGracias, hasta pronto! \nDel equipo de Patitas Limpias.',
        settings.EMAIL_HOST_USER,
        [user.email],
        fail_silently=False
    )


def appointment_email_delete_owner(user, day, time):
    host = 'pharaohmanson@gmail.com'
    timeStr = time.strftime("%H:%M:%S")
    d = datetime.strptime(timeStr, "%H:%M:%S")
    print(day)
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


# this function will run once a day at 7am to send host email with today's appointmnets
def testHourly():
    print("sending")
    frontend_data = []
    today = date.today()
    subject1 = f'Patitas Limpias Citas por {today}'
    from_email = settings.EMAIL_HOST_USER
    to_email = 'pharaohmanson@gmail.com'

    apps = Appointment.objects.filter(
        appointment_date=today).order_by('appointment_time')
    serializer = AppointmentCreateSerializer(apps, many=True)
    appointments = serializer.data

    newda = json.loads(json.dumps(appointments))

    for userapp in newda:
        row = {}
        for key in userapp:
            if key == "appointment_date":
                row.update({"appointment_date": userapp[key]})

            if key == "appointment_time":
                newtime = convert12(userapp[key])
                if newtime == '0:00 PM':
                    newtime = '12:00 PM'
                row.update({"appointment_time": newtime})

            if key == "services":
                for item in userapp[key]:
                    row.update({"services": item["name"]})

            if key == "animal":
                for item1, val in userapp[key].items():
                    if item1 == "name":
                        row.update({"animal": val})

        frontend_data.append(row)

    message1 = get_template("app.html").render(
        {'info': frontend_data, 'today': today})

    mail1 = EmailMessage(
        subject=subject1,
        body=message1,
        from_email=from_email,
        to=[to_email],
    )

    mail1.content_subtype = "html"
    mail1.send()

    daycare_apps = Daycare.objects.filter(
        appointment_date=today).order_by('-start_time')
    serializer1 = DaycareCreateSerializier(daycare_apps, many=True)
    daycare_appointments = serializer1.data

    newdata = json.loads(json.dumps(daycare_appointments))

    for dict in newdata:
        for item, val in dict.items():
            if item == "animal":
                if val == 3:
                    dict[item] = "Perro"

            if item == "start_time":
                newtime = convert12(val)
                if newtime == '0:00 PM':
                    newtime = '12:00 PM'
                dict[item] = newtime

            if item == "end_time":
                endtime = convert12(val)
                if endtime == "0:00 PM":
                    endtime = "12:00 PM"
                dict[item] = endtime

    message = get_template("daily_email_tracker.html").render(
        {'info': newdata, 'today': today})

    subject2 = f'Patitas Limpias Citas de guardería para hoy {today}'

    mail = EmailMessage(
        subject=subject2,
        body=message,
        from_email=from_email,
        to=[to_email],
    )

    mail.content_subtype = "html"
    return mail.send()
