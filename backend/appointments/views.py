from django.db import IntegrityError
from django.db.models import Q
from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Appointment, Service
from .serializers import AppointmentSerializer, ServiceSerializer



@api_view(['GET', 'POST'])
def services(request):
    if request.method == 'GET':
        service_list = Service.objects.all()
        serializer = ServiceSerializer(service_list, many=True)
        return Response(serializer.data)

    serializer = ServiceSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT','DELETE'])
def service_detail(request, service_id):
    try:
       service = Service.objects.get(id=service_id)
    except Service.DoesNotExist:
        return Response({"error": "Service not found."}, status=status.HTTP_404_NOT_FOUND)


    if request.method == 'PUT':
        serializer = ServiceSerializer(service, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    service.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def appointments(request):
    if request.method == "GET":
        search = request.query_params.get("search", "").strip()

        appointment_list = Appointment.objects.all()

        if search:
            appointment_list = appointment_list.filter(
                Q(customer_name__icontains=search)
                | Q(customer_phone__icontains=search)
            )

        serializer = AppointmentSerializer(appointment_list, many=True)
        return Response(serializer.data)

    serializer = AppointmentSerializer(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response(
                {"error": "This service is already booked for the selected date and time."},
                status=status.HTTP_400_BAD_REQUEST
            )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
def appointment_status(request,appointment_id):
    try:
        appointment = Appointment.objects.get(id=appointment_id)
    except Appointment.DoesNotExist:
        return Response({"error": "Appointment not found."}, status=status.HTTP_404_NOT_FOUND)

    new_status = request.data.get('status')
    valid_statuses = [
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled"
    ]
    if new_status not in valid_statuses:
        return Response({"error": "Invalid status."}, status=status.HTTP_400_BAD_REQUEST)
    appointment.status = new_status
    appointment.save()

    serializer = AppointmentSerializer(appointment)
    return Response(serializer.data)


@api_view(["DELETE"])
def appointment_detail(request, appointment_id):
    try:
        appointment = Appointment.objects.get(id=appointment_id)
    except Appointment.DoesNotExist:
        return Response({"error": "Appointment not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        appointment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response({"error": "Method not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


