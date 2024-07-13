from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.usuario_login),
    path('register/', views.usuario_register),
    path('pass/', views.usuario_pass),
    path('exit/', views.salida),
    path('dynamic_static_script_view_user/<str:opc>', views.dynamic_static_script_view_user, name='dynamic_static_script_view_user'),
]