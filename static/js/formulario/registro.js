
// Obtener el token CSRF desde el servidor (puede variar dependiendo de cómo esté implementado en tu aplicación)
var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
var form = document.querySelector('#form_registro')

// campos del formulario
var nombreEstudiante = document.querySelector('[name=estudiante-nombres]');
var apellidoEstudiante = document.querySelector('[name=estudiante-apellidos]');
var cedulaEstudiante = document.querySelector('[name=estudiante-cedula]');
var fecNacEstudiante = document.querySelector('[name=estudiante-fec_nac]');
var edadEstudiante = document.querySelector('[name=estudiante-edad]');
var cedEstudiantilEstudiante = document.querySelector('[name=estudiante-ced_estudiantil]');
var lugarNacEstudiante = document.querySelector('[name=estudiante-lugar_nac]');
var enfEstudiante = document.querySelector('[name=estudiante-enfermedad]');
var nombreRepresentante = document.querySelector('[name=representate-nombres]');
var apellidoRepresentante = document.querySelector('[name=representate-apellidos]');
var cedulaRepresentante = document.querySelector('[name=representate-cedula]');
var fecNacRepresentante = document.querySelector('[name=representate-fec_nac]');
var edadRepresentante = document.querySelector('[name=representate-edad]');
var generoRepresentante = document.querySelector('[name=representate-sexo]');
var vinculoRepresentante = document.querySelector('[name=representate-vinculo]');
var direccionRepresentante = document.querySelector('[name=contacto-direccion]');
var telefonoRepresentante = document.querySelector('[name=contacto-telefono]');


// expresiones para los valores validos en los campos
var regText = /^[a-zA-Z\s]*$/;
var regNum = /^[0-9\s]*$/;
var regMix = /^[0-9a-zA-Z\s]*$/;

//------------------------------------------------------------------------------
// Control de edades
function calcEdad(fecha,campo){
  let hoy = new Date();
  let cumpleanio = new Date(fecha.value);
  let edad = hoy.getFullYear() - cumpleanio.getFullYear();
  let m = hoy.getMonth() - cumpleanio.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanio.getDate())){
    edad --;
  }

  campo.value = edad
}

function verificarFechaMinimaActual(opc=0,eve=0) {
  let inputFecha = 0;
  if (opc==2 && eve!=0) { inputFecha = eve.value; }
  else{ inputFecha = document.getElementById('id_fecha_ingreso').value; }
    const fechaIngresada = new Date(inputFecha);
    const hoy = new Date();
    const fechaMinima = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

    if (fechaIngresada >= fechaMinima) {
      if (opc==2) {
        eve.value = '';
      }
      else{
        alert('La fecha no puede ser superior a la actual.');
          document.getElementById('id_fecha_ingreso').value = '';
      }
    }
}

function verificarFechaMinima(elemento,edad) {
  let inputFecha = elemento.value;
  let fechaIngresada = new Date(inputFecha);
  let hoy = new Date();
  let edadMinima = false;
  let texto = '';

  if (elemento.name == 'representate-fec_nac') {
    edadMinima = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
    texto = 'Debe ser mayor de edad para poder registrarse como representante'
  }
  else if (elemento.name == 'estudiante-fec_nac') {
    edadMinima = new Date(hoy.getFullYear() - 5, hoy.getMonth(), hoy.getDate());
    texto = 'La edad minima son 5 años  para la inscripción de un niño'
  }

  if (fechaIngresada > edadMinima) {
    alert(texto);
    elemento.value = ''; // Limpiar el campo de fecha
    edad.value = '0';
  }
}

//-----------------------------------------------------------------------
// Campos solo texto
nombreEstudiante.addEventListener('keydown', ()=> {regControl(regText)});
apellidoEstudiante.addEventListener('keydown', ()=> {regControl(regText)});
lugarNacEstudiante.addEventListener('keydown', ()=> {regControl(regText)});
enfEstudiante.addEventListener('keydown', ()=> {regControl(regText)});
nombreRepresentante.addEventListener('keydown', ()=> {regControl(regText)});
apellidoRepresentante.addEventListener('keydown', ()=> {regControl(regText)});

// Campos solo numeros
cedulaEstudiante.addEventListener('keydown', ()=> {regControl(regNum)});
cedEstudiantilEstudiante.addEventListener('keydown', ()=> {regControl(regNum)});
cedulaRepresentante.addEventListener('keydown', ()=> {
  regControl(regNum)
});

// Fechas y edades :v
fecNacEstudiante.addEventListener('change', ()=> {
  calcEdad(fecNacEstudiante,edadEstudiante)
  verificarFechaMinima(fecNacEstudiante,edadEstudiante)
});
fecNacRepresentante.addEventListener('change', ()=> {
  calcEdad(fecNacRepresentante,edadRepresentante)
  verificarFechaMinima(fecNacRepresentante,edadRepresentante)
});


// Peticion de busqueda para saber si se encuentran un registro previo y vaciado de existir
cedulaRepresentante.addEventListener('keyup', ()=> {

  if(cedulaRepresentante.value.length == 7 || cedulaRepresentante.value.length == 8){
    cedulaBusqueda('buscar/1/'+cedulaRepresentante.value+'/'+vinculoRepresentante.value).then(json => {
      if (json){
        nombreRepresentante.value = json['fk_relacion']['fk_persona']['nombres']
        apellidoRepresentante.value = json['fk_relacion']['fk_persona']['apellidos']
        fecNacRepresentante.value =  json['fk_relacion']['fk_persona']['fec_nac']
        edadRepresentante.value = json['fk_relacion']['fk_persona']['edad']
        generoRepresentante.value = json['fk_relacion']['fk_persona']['sexo']
        direccionRepresentante.value = json['fk_info_cont']['direccion']
        telefonoRepresentante.value = json['fk_info_cont']['telefono']
      }
    })
  }
});


// Escuchar el evento submit del formulario
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Crear una instancia de FormData para recopilar los datos del formulario
  const formData = new FormData(form);
  // Enviar la solicitud al servidor
  fetch('http://127.0.0.1:8000/registro/0', {
    method: 'POST',
    headers: {
      'X-CSRFToken': csrftoken // Incluir el token CSRF en los encabezados
    },
    body: formData
  })
  .then(response => {
    // Manejar la respuesta del servidor
    console.log(response.text())
    alert('funciono!?')
  })
  .catch(error => {
    // Manejar errores
    alert('hubo un error')
  });
});
