from rest_framework import serializers
from .models import Service, Appointment

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'price', 'duration']

class AppointmentSerializer(serializers.ModelSerializer):
    service_name = serializers.ReadOnlyField(source='service.name', read_only=True  )

    class Meta:
        model = Appointment
        fields = [
            'id',
            'customer_name',
            'customer_phone',
            'service',
            'service_name',
            'appointment_date',
            'appointment_time',
            'notes',
            'status'
        ]
        read_only_fields = ['status']  # Make status read-only to prevent updates


    def validate(self, data):
        customer_name = data.get("customer_name")
        customer_phone = data.get("customer_phone")

        if not customer_name or not customer_name.strip():
            raise serializers.ValidationError(
                {"customer_name": "Customer name is required."}
            )

        if not customer_phone or not customer_phone.strip():
            raise serializers.ValidationError(
                {"customer_phone": "Customer phone is required."}
            )

        return data