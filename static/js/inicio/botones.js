
// referencia campo de busqueda y filtros
var busquedaSimple = document.querySelector('#simple-search')
var filtroSimple = document.querySelector('#estudiante-grado');

// referencia al contenedor de la tabla
var tcuerpo = document.querySelector('#tcuerpo');

// Obtener referencias a los elementos HTML
var modal = document.getElementById('modal');

// expresiones para la busqueda segun el filtro
var regNum = /^[0-9\s]*$/;
var regMixGS = /^[0-9a-zA-Z\s-]*$/;

// Función para ocultar la ventana modal
function hideModal() {
  modal.classList.add('hidden');
  modal.removeChild(document.querySelector('#hijomodal'));
}

// Función para mostrar la ventana modal
async function showModal(opc,valor) {
  var texto = '';
  modal.classList.remove('hidden');

  // Crear un nuevo elemento div
  const confirmDialog = document.createElement('div');
  confirmDialog.id = "hijomodal"
  confirmDialog.classList.add('bg-slate-800', 'bg-opacity-50', 'flex', 'justify-center', 'items-center', 'absolute', 'top-0', 'right-0', 'bottom-0', 'left-0');

  if (opc == 2) {
    texto = `
    <div class="bg-white px-16 py-14 rounded-md text-center">
      <h1 class="text-xl mb-4 font-bold text-slate-500">Desea eliminar el registro?</h1>
      <button id="cancelBtn" class="bg-red-500 px-4 py-2 rounded-md text-md text-white">Cancelar</button>
      <button id="okBtn" class="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Ok</button>
    </div>`;
  }
  else if (opc == 1) {
    async function obtenerDatos(urls) {
      try {
        const respuesta = await fetch(urls);
        if (!respuesta.ok) {
          throw new Error('No se pudo obtener los datos');
        }
        const datos = await respuesta.json();
        return datos;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    await obtenerDatos('buscar/3/'+valor+'/0').then(json => {
      console.log('funcionando2s')
      if (json){
        console.log(json)
        if (json['ced_estudiantil'] == json['fk_persona']['cedula']){
          cedula = 'No posee'
        }
        else{
          cedula = json['fk_persona']['cedula']
        }
        switch(json['fk_persona']['sexo']){
          case 'H': genero = 'Niño'; break;
          case 'M': genero = 'Niña'; break;
        }
        switch(json['repite']){
          case true: repite = 'Si'; break;
          case false: repite = 'No'; break;
        }
        switch(json['fk_representante']['fk_relacion']['vinculo']){
          case 'P': vinculo = 'Papá'; break;
          case 'M': vinculo = 'Mamá'; break;
          case 'T': vinculo = 'Tio(a)'; break;
          case 'A': vinculo = 'Abuelo(a)'; break;
          case 'H': vinculo = 'Hermano(a)'; break;
        }
        texto = `
        <div class='flex flex-col bg-white max-lg:max-w-lg max-xl:max-w-2xl px-16 py-14 rounded-md text-center'>
          <div class='overflow-x-auto my-4'>
          <table class="text-sm text-left text-gray-500 my-4">
          <tr class="text-xs text-gray-700 uppercase bg-gray-50">
            <th scope="col" class="px-4 py-3">Ced. Escolar</th>
            <th scope="col" class="px-4 py-3">Cedula</th>
            <th scope="col" class="px-4 py-3">Nombres y Apellidos</th>
            <th scope="col" class="px-4 py-3">Lugar de Nacimiento</th>
            <th scope="col" class="px-4 py-3">Fecha de Nacimiento</th>
            <th scope="col" class="px-4 py-3">Edad</th>
          </tr>
          <tr class="border-b :border-gray-700">
            <td class="px-4 py-3">${json['ced_estudiantil']}</td>
            <td class="px-4 py-3">${cedula}</td>
            <td class="px-4 py-3">${json['fk_persona']['nombres']} ${json['fk_persona']['apellidos']}</td>
            <td class="px-4 py-3">${json['lugar_nac']}</td>
            <td class="px-4 py-3">${json['fk_persona']['fec_nac']}</td>
            <td class="px-4 py-3">${json['fk_persona']['edad']}</td>
          </tr>
          <tr class="text-xs text-gray-700 uppercase bg-gray-50">
            <th scope="col" class="px-4 py-3">Genero</th>
            <th scope="col" class="px-4 py-3">Repite</th>
            <th scope="col" class="px-4 py-3">Camisa</th>
            <th scope="col" class="px-4 py-3">Pantalon</th>
            <th scope="col" class="px-4 py-3">Zapato</th>
            <th scope="col" class="px-4 py-3">Peso</th>
          </tr>
          <tr class="border-b :border-gray-700">
            <td class="px-4 py-3">${genero}</td>
            <td class="px-4 py-3">${repite}</td>
            <td class="px-4 py-3">${json['fk_tallas']['camisa']}</td>
            <td class="px-4 py-3">${json['fk_tallas']['pantalon']}</td>
            <td class="px-4 py-3">${json['fk_tallas']['estatura']}</td>
            <td class="px-4 py-3">${json['fk_tallas']['peso']}</td>
          </tr>
          <tr class="text-xs text-gray-700 uppercase bg-gray-50">
            <th scope="col" class="px-4 py-3">Enfermedad</th>
          </tr>
          <tr class="border-b :border-gray-700">
            <td class="px-4 py-3"></td>
          </tr>
          <tr class="text-xs text-gray-700 uppercase bg-gray-50">
            <th scope="col" class="px-4 py-3">Cedula del Representante</th>
            <th scope="col" class="px-4 py-3">Nombres y apellidos</th>
            <th scope="col" class="px-4 py-3">Fecha de Nacimiento</th>
            <th scope="col" class="px-4 py-3">Parentesco</th>
            <th scope="col" class="px-4 py-3">Dirección</th>
            <th scope="col" class="px-4 py-3">Telefono</th>          
          </tr>

          <tr class="border-b :border-gray-700">
            <td class="px-4 py-3">${json['fk_representante']['fk_relacion']['fk_persona']['cedula']}</td>
            <td class="px-4 py-3">${json['fk_representante']['fk_relacion']['fk_persona']['nombres']} ${json['fk_representante']['fk_relacion']['fk_persona']['apellidos']}</td>
            <td class="px-4 py-3">${json['fk_representante']['fk_relacion']['fk_persona']['fec_nac']}</td>
            <td class="px-4 py-3">${vinculo}</td>
            <td class="px-4 py-3">${json['fk_representante']['fk_info_cont']['direccion']}</td>
            <td class="px-4 py-3">${json['fk_representante']['fk_info_cont']['telefono']}</td>
          </tr>
          </table>
          </div>
          <button id="cancelBtn" class="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Ok</button>
        </div>`;
      }
    })
  }
  
  // Crear el contenido interno del div
  confirmDialog.innerHTML = texto
  // Agregar el nuevo elemento al documento
  modal.appendChild(confirmDialog);


  if (opc ==2) { 
    document.getElementById('okBtn').addEventListener('click', () => {
      console.log('Eliminar datos');
      eliminarRegistro(valor)
      hideModal();
    });
    console.log('Funciona');
  }
  // Capturar la respuesta del usuario al hacer clic en los botones "Cancelar" y "Ok"
  console.log('funcionando1')
  document.getElementById('cancelBtn').addEventListener('click', () => {
    hideModal();
    console.log('El usuario ha cancelado la acción');
  });
}

// funciones generales
function eliminarRegistro(id){
    fetch(`eliminar/${id}`, {
      method:'GET',
      mode: 'same-origin',
    })
    .then(response => {
      if (response.ok) {
        padre = document.querySelector(`[value='${id}']`).parentNode
        abuelo = padre.parentNode
        bisabuelo = abuelo.parentNode
        tatarabuelo = bisabuelo.parentNode
        tataratatarabuelo = tatarabuelo.parentNode
        tataratatarabuelo.parentNode.removeChild(tataratatarabuelo)
      } else {
        console.error('Error al eliminar el elemento');
      }
    })
    .catch(error => {
      console.error('Error de red:', error);
    });
}

function botones(){
  // referencia a los botones principales
  var mostrar = document.querySelectorAll('#mostrar');
  var actualizar = document.querySelectorAll('#actualiza');
  var eliminar = document.querySelectorAll('#borrar');

  mostrar.forEach(elemento =>{
    elemento.addEventListener('click', ()=>{
      showModal(1,elemento.value)
      console.log(elemento.value)
    })
  })
  actualizar.forEach(elemento =>{
    elemento.addEventListener('click', ()=>{
      remover()
      console.log('')
      titulo.innerHTML = 'Actuarizar Registro'
      clasesActivo(usuario)
      requestViews(`http://127.0.0.1:8000/registro/${elemento.value}`)
    })
  })
  eliminar.forEach(elemento =>{
    elemento.addEventListener('click', ()=>{
      showModal(2,elemento.value)
    })
  })
}

function registroBusquedas(data){
  texto = '';
  console.log(data.length)
  for(i=0;i<data.length;i++){

    if (data[i]['ced_estudiantil'] == data[i]['fk_persona']['cedula']){
      cedula = 'No posee'
    }else{
      cedula = data[i]['fk_persona']['cedula']
    }

    texto += `<tr class="border-b :border-gray-700">
      <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">${data[i]['ced_estudiantil']}</th>
        <td class="px-4 py-3">
          ${cedula}
        </td>
        <td class="px-4 py-3">${data[i]['fk_persona']['nombres']} ${data[i]['fk_persona']['apellidos']}</td>
        <td class="px-4 py-3">${data[i]['lugar_nac']}</td>
        <td class="px-4 py-3">${data[i]['fk_persona']['fec_nac']}</td>
        <td class="px-4 py-3">${data[i]['fk_persona']['edad']}</td>
        <td class="px-4 py-3 flex items-center justify-end">
        <div>
          <ul class="flex flex-row py-1 text-sm text-gray-700 :text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
            <li>
              <button id='mostrar' class="block py-2 px-4 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none rounded-lg" type="button" value='${data[i]['ced_estudiantil']}'>
                <svg id="Layer_1" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" class="w-4 h-4"><path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm0 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1 -10 10zm5-10a1 1 0 0 1 -1 1h-3v3a1 1 0 0 1 -2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 1 1z"/></svg>
              </button>
            </li><li>
              <button id='actualiza' class="block py-2 px-4 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none rounded-lg" type="button" value='${data[i]['ced_estudiantil']}'>
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512" class="w-4 h-4"><path d="M22.853,1.148a3.626,3.626,0,0,0-5.124,0L1.465,17.412A4.968,4.968,0,0,0,0,20.947V23a1,1,0,0,0,1,1H3.053a4.966,4.966,0,0,0,3.535-1.464L22.853,6.271A3.626,3.626,0,0,0,22.853,1.148ZM5.174,21.122A3.022,3.022,0,0,1,3.053,22H2V20.947a2.98,2.98,0,0,1,.879-2.121L15.222,6.483l2.3,2.3ZM21.438,4.857,18.932,7.364l-2.3-2.295,2.507-2.507a1.623,1.623,0,1,1,2.295,2.3Z"/></svg>
              </button>
            </li>
            <li>
              <button id='borrar' class="block py-2 px-4 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none rounded-lg" type="button" value='${data[i]['ced_estudiantil']}'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4 "><g id="_01_align_center" data-name="01 align center"><path d="M22,4H17V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2ZM9,2h6V4H9Zm9,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V6H18Z"/><rect x="9" y="10" width="2" height="8"/><rect x="13" y="10" width="2" height="8"/></g></svg>
              </button>
            </li>
          </ul>
        </div>
        </td>
      </tr>`
  }
  tcuerpo.innerHTML = texto;
}

function buscarElemento(){
  let condicionesBusqueda = [(busquedaSimple.value.length == 8),(busquedaSimple.value.length == 7 || busquedaSimple.value.length == 8),('prueba')]
  let condicionBusqueda = false

  // condicion del filtro
  switch(filtroSimple.value){
    case '5': condicionBusqueda = condicionesBusqueda[0]; break;
    case '2': condicionBusqueda = condicionesBusqueda[0]; break;
    case '3': condicionBusqueda = condicionesBusqueda[1]; break;
    case '4': condicionBusqueda = condicionesBusqueda[2]; break;
    default: console.log('por definir'); break;
  }
  console.log('condicion')
  console.log(condicionBusqueda)
  // peticion para la busqueda
  if(condicionBusqueda){
    cedulaBusqueda('buscar/'+filtroSimple.value+'/'+busquedaSimple.value+'/0').then(json => {
      if (json){
        console.log(json)

        if (filtroSimple.value == '5') {
          registroBusquedas(json)
        } else {
          registroBusquedas([json])
        }

      }
    })
  }
}
// seccion para la busqueda de inicio
filtroSimple.addEventListener('change',()=>{
  if (busquedaSimple.value != ''){
    buscarElemento()
  }
})

// campo de busqueda
busquedaSimple.addEventListener('keydown',()=>{
  console.log(filtroSimple.value)
  // condicion del filtro
  switch(filtroSimple.value){
    case '5': regControl(regNum); break;
    case '2': regControl(regNum); break;
    case '3': regControl(regNum); break;
    case '4': regControl(regMixGS); break;
    default: console.log('por definir'); break;
  }
})

busquedaSimple.addEventListener('keyup',()=>{
  buscarElemento();
})

botones()






