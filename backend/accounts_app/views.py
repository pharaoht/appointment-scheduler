from rest_framework import status, generics
from rest_framework.response import Response
from .models import Appointment, UserAccount, Service
from .serializers import AppointmentCreateSerializer
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Q
from datetime import timedelta, datetime
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
def get_appointments(request):
    today = datetime.today()
    Appointments = Appointment.objects.filter(
        appointment_date__gte=today)
    serializer = AppointmentCreateSerializer(Appointments, many=True)

    return Response(status=status.HTTP_200_OK, data=serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def create_appointment(request):
    print(request.data)
    # get user object model
    user = UserAccount.objects.get(email=request.data['email'])
    # get service object model
    service = Service.objects.get(name=request.data['service'])
    # for foreign key constaints have to pass both service and user
    client = Appointment(client=user, service=service)
    if request.method == "POST":
        serializer = AppointmentCreateSerializer(
            client, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.errors)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated, ])
def delete_appointment(request, id):
    try:
        appointment = Appointment.objects.find(id=id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "DELETE":
        operation = Appointment.delete()
        data = {}
        if operation:
            data['success'] = 'delete successfull'
            return Response(status=status.HTTP_200_OK, data=data)
        else:
            data['failure'] = 'delete failed'
            return Response(status=status.HTTP_400_BAD_REQUEST, data=data)
