from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import login, logout, authenticate

# make user
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

# for the validation user
from django.contrib.auth.decorators import login_required

# charge the static files 
from django.templatetags.static import static

# create view for management the files js
def dynamic_static_script_view_user(request,opc):
    # Generar la URL del archivo JavaScript estático
    files_list = [
        'js/usuario/login_user.js',
        'js/usuario/create_user.js',
        'js/usuario/pass_user.js', #falta por crear
        'js/usuario/', #falta por crear
        ]

    javascript_static_url = static(files_list[int(opc)-1])

    # Crear el script que carga el archivo JavaScript estático
    # let base_script = document.querySelector('#js_dynamic');
    javascript_content = f"""
    var script_dynamic = document.createElement('script');
    script_dynamic.id = 'script_dynamic'
    script_dynamic.src = '{javascript_static_url}';
    contenedor.appendChild(script_dynamic);
    """
    # contenedor.removeChild(base_script)

    # Establecer la respuesta con el script dinámico
    response = HttpResponse(javascript_content, content_type='application/javascript')
    return response


# Create your views here.
def usuario_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request,user)
            return  HttpResponse("Autenticación exitosa", status=200)
        else:
            return HttpResponse("Credenciales inválidas", status=401)
    else:
        return render(request, 'usuario/usuario_login.html')

def usuario_pass(request):
    return render(request, 'usuario/usuario_pass.html')

def usuario_register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Crear un nuevo usuario
        nuevo_usuario = User(
            username=username,
            email=email,
            password=make_password(password)  # Se encripta la contraseña antes de guardarla
        )
        nuevo_usuario.save()

        return HttpResponse('Usuario creado exitosamente')
    else:
        return render(request, 'usuario/usuario_create.html')

@login_required
def salida(request):
    logout(request)
    return redirect('index')