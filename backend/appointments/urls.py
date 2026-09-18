from django.urls import path

from . import views


urlpatterns = [
    path("services", views.services),
    path("services/<int:service_id>", views.service_detail),
    path("appointments", views.appointments),
    path(
        "appointments/<int:appointment_id>/status",
        views.appointment_status,
    ),
    path(
        "appointments/<int:appointment_id>",
        views.appointment_detail,
    ),
]