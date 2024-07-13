// botones para generar
var buena_conducta = document.getElementById('buena_conducta')
var constancia_estudio = document.getElementById('constancia_estudio')
var reporte_por_seccion = document.getElementById('reporte_por_seccion')
var reporte_general = document.getElementById('reporte_general')

// Obtener referencias a la ventana Modal
var modal = document.getElementById('modal');

// entradas de texto
var inputs = document.querySelectorAll('#simple-search')

// expresion regular para los inputs ( solo numeros )
var onlyNum = /^[0-9]*$/;

// Control de caracteres en los inputs
function regControl(regular){

  if (window.event.key === 'Backspace' || window.event.key === 'Delete') {
    return;
  }
    
  else if (!regular.test(window.event.key)) {
    window.event.preventDefault(); // Evitar la entrada de caracteres no permitidos
  }
}

// Función para ocultar la ventana modal
function hideModalReporte() {
  modal.classList.add('hidden');
  modal.removeChild(document.querySelector('#hijomodal'));
}

// Función para mostrar la ventana modal
function showModalReporte(opc) {
  modal.classList.remove('hidden');
  let texto = ''

  if ( opc == 1 ){
    texto = `
    <div class="bg-white px-16 py-14 rounded-md text-center">
      <h1 class="text-xl mb-4 font-bold text-slate-500">Llene el campo para la busqueda</h1>
      <button id="cancelBtn" class="bg-red-500 px-4 py-2 rounded-md text-md text-white">Aceptar</button>
    </div>`;
  }

  else if ( opc == 2 ){
    texto = `
    <div class="bg-white px-16 py-14 rounded-md text-center">
      <h1 class="text-xl mb-4 font-bold text-slate-500">No hay coincidencia</h1>
      <button id="cancelBtn" class="bg-red-500 px-4 py-2 rounded-md text-md text-white">Aceptar</button>
    </div>`;
  }

  // Crear un nuevo elemento div
  const confirmDialog = document.createElement('div');
  confirmDialog.id = "hijomodal"
  confirmDialog.classList.add('bg-slate-800', 'bg-opacity-50', 'flex', 'justify-center', 'items-center', 'absolute', 'top-0', 'right-0', 'bottom-0', 'left-0');

  // Crear el contenido interno del div
  confirmDialog.innerHTML = texto

  // Agregar el nuevo elemento al documento
  modal.appendChild(confirmDialog);

  // Capturar la respuesta del usuario al hacer clic en los botones "Cancelar" y "Ok"
  document.getElementById('cancelBtn').addEventListener('click', () => {
    hideModalReporte();
    console.log('El usuario ha cancelado la acción');
  });
}

// funcionalidad principal de reportes
function cedulaBusquedaReporte(url){
	return fetch(url,{
	  method:'GET',
    mode: 'same-origin'
  }).then((response) => {
		if (response.ok) {
    		return response.json()
    	}
    	else{
    		showModalReporte(2)
    	}
	}).then((data=0) => {
    	return data
	})
}

function requestPDF(urls) {
  const request = new Request(
      urls,
      {
          method: 'GET',
          mode: 'same-origin',
          //body: new FormData(form)
      });
  fetch(request)
  .then((response) => {
      if (response.ok) {
        return response.blob();
      }
      throw new Error('Network response was not ok.');
  })
  .then(function(data) {
    console.log('funciona?')
    const blob = new Blob([data], { type: 'application/pdf'});
    const url = URL.createObjectURL(blob);
    window.open(url); 
    return true
  });
}

reporte_general.addEventListener('click', ()=>{
    window.event.preventDefault();
    requestPDF('http://127.0.0.1:8000/reporte_2/1/0/0')
})
reporte_por_seccion.addEventListener('click', ()=>{
    window.event.preventDefault();
    grado = document.getElementById('estudiante-grado').value
    seccion = document.getElementById('estudiante-seccion').value
    console.log('http://127.0.0.1:8000/reporte_2/2/'+seccion+'/'+grado)
    requestPDF('http://127.0.0.1:8000/reporte_2/2/'+seccion+'/'+grado)
})
// campos con inputs de entrada de datos por teclado
constancia_estudio.addEventListener('click', ()=>{
  window.event.preventDefault();
  if (inputs[0].value.length == 7 || inputs[0].value.length == 8){
    cedulaBusquedaReporte('buscar/2/'+inputs[0].value+'/0').then(json => {
      if (json){
        console.log(json)
        console.log('funcionando')
        requestPDF('http://127.0.0.1:8000/reporte_2/3/'+inputs[0].value+'/0')
      }
    })
  }
  else{
    showModalReporte(1)
  }
})
buena_conducta.addEventListener('click', ()=>{
    window.event.preventDefault();
    if (inputs[1].value.length == 7 || inputs[1].value.length == 8){
      cedulaBusquedaReporte('buscar/2/'+inputs[1].value+'/0').then(json => {
        if (json){
          console.log(json)
          console.log('funcionando')
          requestPDF('http://127.0.0.1:8000/reporte_2/4/'+inputs[1].value+'/0')
        }
      })
    }
    else{
      showModalReporte(1)
    }
})

inputs.forEach(elemento =>{
    elemento.addEventListener('keydown', ()=> {regControl(onlyNum)})
})