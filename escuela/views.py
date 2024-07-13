from django.shortcuts import render
from django.http import HttpResponse
from django.db.models import Q
from .models import persona, representante, relacion, info_contacto
from . forms import *

# obtener la fecha
from datetime import datetime

# modulos para generar reportes en pdf 
import os
from django.conf import settings
from django.template.loader import get_template
from xhtml2pdf import pisa

# charge the static files 
from django.templatetags.static import static

# charge the serializers functions
from . import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response

# para las respuestas rapidas de acciones 
from django.contrib.auth.decorators import login_required

# funcion simple para busqueda
def buscar(opc,*args):
    busqueda = False
    if opc == 1:
        if persona.objects.filter(cedula = args[0]).exists():
            busqueda = persona.objects.get(cedula = args[0])

    elif opc ==2:
        if relacion.objects.filter(fk_persona = args[0], vinculo = args[1]).exists():
            busqueda = relacion.objects.get(fk_persona = args[0], vinculo = args[1])

    elif opc == 3:
        if info_contacto.objects.filter(direccion = args[0], telefono = args[1]).exists():
            busqueda = info_contacto.objects.get(direccion = args[0], telefono = args[1])

    elif opc == 4:
        if representante.objects.filter(fk_relacion = args[0]).exists():
            busqueda = representante.objects.get(fk_relacion = args[0])

    return busqueda


# create view for management the files js
def dynamic_static_script_view(request,opc):
    # Generar la URL del archivo JavaScript estático
    files_list = [
        'js/inicio/botones.js',
        'js/formulario/registro.js',
        'js/reporte/report_pdf.js', #falta hacer el fichero para reporte
        'js/usuario/', #falta hacer el fichero para usuario
        'js/nav.js',
        ]

    javascript_static_url = static(files_list[int(opc)-1])

    if opc == '5':
        javascript_content = f"""
        var script_dynamic = document.createElement('script');
        script_dynamic.id = 'script_dynamic'
        script_dynamic.src = '{javascript_static_url}';
        document.body.appendChild(script_dynamic);
        """
    else:
        javascript_content = f"""
        var script_dynamic = document.createElement('script');
        script_dynamic.id = 'script_dynamic'
        script_dynamic.src = '{javascript_static_url}';
        contenedor.appendChild(script_dynamic);
        """

    # Establecer la respuesta con el script dinámico
    response = HttpResponse(javascript_content, content_type='application/javascript')
    return response


#base
def sala(request):
    return render(request,'layouts/sala.html')

# Create your views here.
def index(request):
    return render(request,'layouts/index.html')

def inicio(request):
    datos_estudiante = estudiante.objects.filter(activo=True)
    return render(request, 'inicio.html' ,{
        'estudiante':datos_estudiante
    })

# vista para generar reporte en pdf
def reporte(request):
    return render(request, 'reporte.html')
    

def usuario(request):
    #resultado = username
    return render(request, 'usuario.html')

def registro(request, id='0'):

    if request.method == 'POST':

        estudiante_reg = False

        # verifica si posee cedula 
        if request.POST.get('estudiante-cedula') == '':
            cedula = request.POST.get('estudiante-ced_estudiantil')

        else:
            cedula = request.POST.get('estudiante-cedula')

        # informacion del estudiante como persona
        estudiante_reg = buscar(1,cedula)
        if not estudiante_reg:
            estudiante_reg = persona()
            estudiante_reg.cedula = cedula

        if 'id_estudiante' in request.POST and estudiante.objects.filter(id = request.POST.get('id_estudiante')).exists():

            cedulaEstudiante = estudiante.objects.get(id = request.POST.get('id_estudiante'))

            if cedulaEstudiante.fk_persona.cedula != cedula:
                estudiante_reg.cedula = cedula

        estudiante_reg.nombres = request.POST.get('estudiante-nombres')
        estudiante_reg.apellidos = request.POST.get('estudiante-apellidos')
        estudiante_reg.fec_nac = request.POST.get('estudiante-fec_nac')
        estudiante_reg.edad = request.POST.get('estudiante-edad')
        estudiante_reg.sexo = request.POST.get('estudiante-sexo')
        estudiante_reg.save()

        # informacion del representante
        datos_representate_reg = buscar(1,request.POST.get('representate-cedula'))

        if not datos_representate_reg:
            datos_representate_reg = persona()
            datos_representate_reg.cedula = request.POST.get('representate-cedula')

        if 'id_estudiante' in request.POST and estudiante.objects.filter(id = request.POST.get('id_estudiante')).exists():

            cedulaRepresentanteEstudiante = estudiante.objects.get(id = request.POST.get('id_estudiante'))

            if cedulaRepresentanteEstudiante.fk_representante.fk_relacion.fk_persona.cedula != request.POST.get('representate-cedula'):
                datos_representate_reg.cedula = request.POST.get('representate-cedula')

        datos_representate_reg.nombres = request.POST.get('representate-nombres')
        datos_representate_reg.apellidos = request.POST.get('representate-apellidos')
        datos_representate_reg.fec_nac = request.POST.get('representate-fec_nac')
        datos_representate_reg.edad = request.POST.get('representate-edad')
        datos_representate_reg.sexo = request.POST.get('representate-sexo')
        datos_representate_reg.save()

        # establece la relacion del representante con el estudiante
        relacion_reg = buscar(2,datos_representate_reg,request.POST.get('representate-vinculo'))

        if not relacion_reg:
            relacion_reg = relacion()
            relacion_reg.fk_persona = datos_representate_reg
            relacion_reg.vinculo = request.POST.get('representate-vinculo')
            relacion_reg.save()

        # informacion del representante
        info_contacto_reg = buscar(3,request.POST.get('contacto-direccion'),request.POST.get('contacto-telefono'))

        if not info_contacto_reg:
            info_contacto_reg = info_contacto()

        info_contacto_reg.direccion = request.POST.get('contacto-direccion')
        info_contacto_reg.telefono = request.POST.get('contacto-telefono')
        info_contacto_reg.save()
        
        # establece cual de los familiares es el representante
        representante_reg = buscar(4,relacion_reg)
        if not representante_reg:
            representante_reg = representante()
            representante_reg.fk_relacion = relacion_reg

        representante_reg.fk_info_cont = info_contacto_reg
        representante_reg.save()


        # tallas del estudiante
        tallas_estudiante = tallas()
        tallas_estudiante.camisa = request.POST.get('talla-camisa')
        tallas_estudiante.pantalon = request.POST.get('talla-pantalon')
        tallas_estudiante.estatura = request.POST.get('talla-estatura')
        tallas_estudiante.peso = request.POST.get('talla-peso')
        tallas_estudiante.save()

        # datos del estudiante
        datos_estudiante_reg = False
        # en caso de que la funcion este actualizando ...
        if not 'id_estudiante' in request.POST:
            datos_estudiante_reg = estudiante()
            datos_estudiante_reg.fk_persona = estudiante_reg
            datos_estudiante_reg.fk_tallas = tallas_estudiante
        
        else:
            datos_estudiante_reg = estudiante.objects.get(id = request.POST.get('id_estudiante'))

        datos_estudiante_reg.ced_estudiantil = request.POST.get('estudiante-ced_estudiantil')
        datos_estudiante_reg.lugar_nac = request.POST.get('estudiante-lugar_nac')
        datos_estudiante_reg.seccion = request.POST.get('estudiante-seccion')
        datos_estudiante_reg.grado = request.POST.get('estudiante-grado')

        if request.POST.get('estudiante-repite') != '':
            datos_estudiante_reg.repite = False
        else:
            datos_estudiante_reg.repite = True

        datos_estudiante_reg.fk_representante = representante_reg
        datos_estudiante_reg.save()

        

        # por si posee enfermedad
        enfermedad_estudiante = False

        if enfermedad.objects.filter(fk_estudiante = datos_estudiante_reg).exists():
            enfermedad_estudiante = enfermedad.objects.get(fk_estudiante = datos_estudiante_reg)

        if not enfermedad_estudiante:
            enfermedad_estudiante = enfermedad()
            enfermedad_estudiante.fk_estudiante = datos_estudiante_reg

        enfermedad_estudiante.enfermedad = request.POST.get('estudiante-enfermedad')
        enfermedad_estudiante.save()
       
        # para los campos de los familiares del estudiante

        # for i in int(request.POST['n_familiares']):
        #     familiar_reg = persona()
        #     familiar_reg.nombres = request.POST['nombres']
        #     familiar_reg.apellidos = request.POST['apellidos']
        #     familiar_reg.cedula = request.POST['cedula']
        #     familiar_reg.fec_nac = request.POST['fec_nac']
        #     familiar_reg.edad = request.POST['edad']
        #     familiar_reg.sexo = request.POST['sexo']
        #     familiar_reg.save()

        #     relacion_reg.fk_persona = familiar_reg
        #     relacion_reg.vinculo = request.POST['vinculo']

    elif request.method == 'GET' and id != '0':

        datos_estudiante = estudiante.objects.get(ced_estudiantil = id)
        fechaNE = datos_estudiante.fk_persona.fec_nac.strftime('%Y-%m-%d')
        fechaNR = datos_estudiante.fk_representante.fk_relacion.fk_persona.fec_nac.strftime('%Y-%m-%d')
        estudiante_enfermedad = False 

        if enfermedad.objects.filter(fk_estudiante=datos_estudiante).exists():
            estudiante_enfermedad = enfermedad.objects.get(fk_estudiante=datos_estudiante)

        return render(request, 'formulario.html', {'estudiante':datos_estudiante,'enfermedad':estudiante_enfermedad,'fecha':fechaNE,'fecha2':fechaNR})

    return render(request, 'formulario.html')


@api_view(['GET'])
def busquedas(request,opcion,data1,data2=0):
    # para la busquedas y respuestas en formato JSON
    respuesta = False
    try:
        if opcion == '1':
            personaRepresentante = buscar(1,data1)
            relacionRepresentante = buscar(2,personaRepresentante,data2)
            persona = representante.objects.get(fk_relacion = relacionRepresentante)
            print(representante.objects.get(fk_relacion = relacionRepresentante))
            print(persona.fk_relacion.fk_persona.nombres)
            respuesta = serializers.representanteSerializer(persona)

        elif opcion == '2':
            personaEstudiante = buscar(1,data1)
            persona = False

            #if estudiante.objects.filter(fk_persona = personaEstudiante).exists():
            persona = estudiante.objects.get(fk_persona = personaEstudiante)
            print(persona.fk_persona.nombres)
            respuesta = serializers.estudianteSerializer(persona)

        elif opcion == '3':
            persona = False

            #if estudiante.objects.filter(ced_estudiantil = data1).exists():
            persona = estudiante.objects.get(ced_estudiantil = data1)
            print(persona.fk_persona.nombres)
            respuesta = serializers.estudianteSerializer(persona)
        
        # falta adaptar para buscar por grado y seccion
        elif opcion == '4':
            datos = data1.split('-')
            persona = False

            if estudiante.objects.filter(grado = datos[0], seccion = datos[1]).exists():
                persona = estudiante.objects.filter(grado = datos[0], seccion = datos[1])
                print(persona.fk_persona.nombres)
                respuesta = serializers.estudianteSerializer(persona)

        elif opcion == '5':
            personaRepresentante = buscar(1,data1)
            #personasEstudiantes = []
            persona = []

            relacionRepresentante = relacion.objects.filter(fk_persona = personaRepresentante)

            condiciones = [Q(fk_relacion = valor) for valor in relacionRepresentante]
            condicionFinal = condiciones[0]

            for i in condiciones[1:]:
                condicionFinal |= i

            # para recorrer las coincidencias con el representante
            #for i in relacionRepresentante:
            persona = representante.objects.filter(condicionFinal)

            condiciones = [Q(fk_representante = valor) for valor in persona]
            condicionFinal = condiciones[0]

            for i in condiciones[1:]:
                condicionFinal |= i

            personasEstudiantes = estudiante.objects.filter(condicionFinal, activo=True)

            respuesta = serializers.estudianteSerializer(personasEstudiantes,many=True)


    except:
        return HttpResponse('False',status=404)

    return Response(respuesta.data)

#eliminar
#@api_view(['DELETE'])
def borrar(request,id='',opc='0'):
    #eliminar los datos del estudiante
    dataEstudiante = estudiante.objects.get(ced_estudiantil=id)
    if not opc != '0':
    
        dataEstudiante.activo = False
    
    dataEstudiante.save()
    #respuesta = serializers.estudianteSerializer(dataEstudiante)

    return HttpResponse('True',status=200)

# Inicio de las vistas de sebastian
# funcion generar pdf
def generaReportePDF(request, opcion, id = 0, data = 0):

    # Obtener la fecha actual
    fecha_creacion = datetime.now().strftime('%d/%m/%y')

    # variables para busqueda y contexto
    busqueda = False
    context = False
    template_path = False

    if estudiante.objects.filter(ced_estudiantil = id).exists() and id != 0 and (data == 0 or data == '0'):
        busqueda = estudiante.objects.get(ced_estudiantil = id)

    elif persona.objects.filter(cedula = id).exists() and id != 0 and (data == 0 or data == '0'):
        personaEstudiante = persona.objects.get(cedula = id)
        busqueda = estudiante.objects.get(fk_persona = personaEstudiante)

    # reporte general
    if opcion == '1' and not busqueda != False:
        busqueda = estudiante.objects.filter(activo=True)
        template_path = 'reportes/reporte_general.html'
        context = {'estudiante': busqueda, 'fec':fecha_creacion}

    # reporte por seccion
    elif opcion == '2' and not busqueda != False:
        if estudiante.objects.filter(seccion = id, grado = int(data)).exists():
            busqueda = estudiante.objects.filter(seccion = id, grado = int(data))
            template_path = 'reportes/reporte_seccion.html'
            context = {'estudiante': busqueda, 'fec':fecha_creacion, 'seccion':str(busqueda[0].grado)+ ' ' + busqueda[0].seccion}
        
        else:
            return HttpResponse('False',status=404)
   
    # reporte constacia de estudio
    elif opcion == '3' and busqueda != False:
        template_path = 'reportes/constancia_estudio.html'
        context = {'estudiante': busqueda, 'fec':fecha_creacion}

    # reporte buena conducta
    elif opcion == '4' and busqueda != False:
        template_path = 'reportes/buena_conducta.html'
        context = {'estudiante': busqueda, 'fec':fecha_creacion}


    template = get_template(template_path)
    html = template.render(context)

    response = HttpResponse(content_type='application/pdf')
    #response['Content-Disposition'] = 'attachment; filename="reporte.pdf"'
    # creando el pdf
    pisa_status = pisa.CreatePDF(html, dest=response)
    if pisa_status.err:
        return HttpResponse('Error al generar el PDF', status=500)

    return response

