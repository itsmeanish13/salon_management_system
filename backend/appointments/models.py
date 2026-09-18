from django.core.validators import MinValueValidator
from django.db import models


class Service(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0.01)],
    )
    duration = models.PositiveIntegerField(
        validators=[MinValueValidator(1)]
    )

    def __str__(self):
        return self.name


class Appointment(models.Model):
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Confirmed", "Confirmed"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    ]

    customer_name = models.CharField(max_length=100)
    customer_phone = models.CharField(max_length=20)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    notes = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending",
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=[
                    "service",
                    "appointment_date",
                    "appointment_time",
                ],
                name="unique_service_appointment_time",
            )
        ]

    def __str__(self):
        return f"{self.customer_name} - {self.service.name}"