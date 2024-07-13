from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('inicio/', views.inicio),
    path('sala/', views.sala),
    path('registro/<str:id>', views.registro, name='registro' ),
    path('eliminar/<str:id>', views.borrar, name='eliminar' ),
    path('usuario/', views.usuario, name='usuario'),
    path('reporte_2/<str:opcion>/<str:id>/<str:data>', views.generaReportePDF),
    path('reporte/', views.reporte, name='reporte'),
    path('buscar/<str:opcion>/<str:data1>/<str:data2>', views.busquedas, name='buscar'),
    # Link para cargar archivos static 
    path('dynamic_static_script_view/<str:opc>', views.dynamic_static_script_view, name='dynamic_static_script_view'),
]