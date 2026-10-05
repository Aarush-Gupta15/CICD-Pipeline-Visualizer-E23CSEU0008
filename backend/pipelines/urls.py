from django.urls import path
from . import views

urlpatterns = [
    path("health/", views.health, name="health"),
    path("repositories/", views.RepositoryList.as_view(), name="repositories"),
    path("workflows/", views.WorkflowList.as_view(), name="workflows"),
    path("dashboard/", views.dashboard, name="dashboard"),
    path("runs/", views.RunList.as_view(), name="runs"),
    path("runs/<int:pk>/", views.RunDetail.as_view(), name="run-detail"),
]
