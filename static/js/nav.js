
// Variables
// Get csrf token
// const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

const salir = document.getElementById('salir');
const entrada = document.getElementById('entrada');
const registro = document.getElementById('registro');
const reportes = document.getElementById('reporte');
const titulo = document.getElementById('titulo');
var usuario = document.getElementById('usuario');
const menu = document.getElementById('menu');
const lateral = document.getElementById('lateral');
const cerrarlateral = document.getElementById('cerrarlateral');

contenedor = document.getElementById('contenedor');

let opcion_url = 0


//// Functions
function request_dynamic_script(opcion_url){

    // Crear una nueva etiqueta <script>
    let script = document.createElement('script');
    script.id = 'js_dynamic'
    script.src = `http://127.0.0.1:8000/dynamic_static_script_view/${opcion_url}`;

    // Agregar la etiqueta <script> al final del cuerpo del documento
    contenedor.appendChild(script);
    contenedor.removeChild(document.querySelector('#js_dynamic'))

};

function requestViews(urls) {
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
            return response.text();
        }
        throw new Error('Network response was not ok.');
    })
    .then(function(data) {

        if (urls == 'http://127.0.0.1:8000/inicio/') {
            request_dynamic_script(1)
        } 
        else if (/http:\/\/127\.0\.0\.1:8000\/registro\//.test(urls)) {
            request_dynamic_script(2)
        }
        else if (urls == 'http://127.0.0.1:8000/reporte/') {
            request_dynamic_script(3)
        }
        else if (urls == 'http://127.0.0.1:8000/usuario/') {
            request_dynamic_script(2)
        }
        else if (urls == 'http://127.0.0.1:8000/exit/') {
            window.location.reload()
        }
        contenedor.innerHTML = data

    });
}
//
function remover(){
    tieneClase = lateral.classList.contains( '-translate-x-0' );
    if ( tieneClase ){
        lateral.classList.remove('-translate-x-0')
        lateral.classList.add('-translate-x-80')
    }
}
//para cambiar las clases referente a los estilos
function clasesActivo(nodo){
    let elementos = [entrada,registro,reportes]
    let Hijo = nodo.childNodes

    elementos.forEach(element => {
        let Hijoelemento = element.childNodes
        if (element.classList.contains('active')){
            element.classList.remove('active')
            element.removeAttribute('aria-current')
            Hijoelemento[1].classList.remove('bg-gradient-to-tr','from-blue-600','to-blue-400','shadow-md','shadow-blue-500/20','hover:shadow-lg','hover:shadow-blue-500/40','active:opacity-[0.85]')
            Hijoelemento[1].classList.add('text-white','hover:bg-white/10','active:bg-white/30')
        }
    });
    if (nodo.id != 'usuario'){
        nodo.className = 'active'
        nodo.attributes["aria-current"] = 'page'
        Hijo[1].classList.remove('hover:bg-white/10','active:bg-white/30')
        Hijo[1].classList.add('bg-gradient-to-tr','from-blue-600','to-blue-400','shadow-md','shadow-blue-500/20','hover:shadow-lg','hover:shadow-blue-500/40','active:opacity-[0.85]')
    }
}

// Control de caracteres en los inputs
function regControl(regular){

    if (window.event.key === 'Backspace' || window.event.key === 'Delete') {
      return;
    }
      
    else if (!regular.test(window.event.key)) {
      window.event.preventDefault(); // Evitar la entrada de caracteres no permitidos
    }
}

// funcion para peticion json
function cedulaBusqueda(url){
	return fetch(url,{
	  method:'GET',
    mode: 'same-origin'
  }).then((response) => {
		if (response.ok) {
    	return response.json()
    }
	}).then((data=0) => {
    return data
	})
}

//// Events
//form.addEventListener('submit', sendForm);
//para el menu lateral
menu.addEventListener('click',()=>{
    tieneClase = lateral.classList.contains( '-translate-x-80' );
    if ( tieneClase ){
        lateral.classList.remove('-translate-x-80')
        lateral.classList.add('-translate-x-0')
    }
    else {
        remover()
    }
})
cerrarlateral.addEventListener('click',()=>{
    remover()
})

//opciones del menu
salir.addEventListener('click', ()=>{
    window.event.preventDefault();
    requestViews('http://127.0.0.1:8000/exit/')
});
entrada.addEventListener('click', ()=>{
    window.event.preventDefault();
    remover()
    titulo.innerHTML = 'Inicio'
    clasesActivo(entrada)
    requestViews('http://127.0.0.1:8000/inicio/')
});
registro.addEventListener('click', ()=>{
    window.event.preventDefault();
    remover()
    titulo.innerHTML = 'Registro'
    clasesActivo(registro)
    requestViews('http://127.0.0.1:8000/registro/0')
});
usuario.addEventListener('click', ()=>{
    window.event.preventDefault();
    remover()
    titulo.innerHTML = 'Usuario'
    clasesActivo(usuario)
    requestViews('http://127.0.0.1:8000/usuario/')
});
reportes.addEventListener('click', ()=>{
    window.event.preventDefault();
    remover()
    titulo.innerHTML = 'Reportes'
    clasesActivo(reportes)
    requestViews('http://127.0.0.1:8000/reporte/')
});


request_dynamic_script(1)
