// Btnes base para el usuario
var btn_login = document.getElementById('loginuser');
var btn_register = document.getElementById('registeruser');
var btn_pass = document.getElementById('passuser');

var contenedor = document.getElementById('contenedor');

var usuario = document.getElementById('usuario');
var sala = document.getElementById('sala');

//charge user script
function request_dynamic_script_user(opcion_url){

    // Crear una nueva etiqueta <script>
    let script = document.createElement('script');
    script.id = 'js_dynamic'
    script.src = `http://127.0.0.1:8000/dynamic_static_script_view_user/${opcion_url}`;

    // Agregar la etiqueta <script> al final del cuerpo del documento
    contenedor.appendChild(script);
    contenedor.removeChild(document.querySelector('#js_dynamic'))

};

// formularios
function requestFormUser(urls) {
	const formData = new FormData(document.querySelector('form'));

  	// Enviar la solicitud al servidor
  	fetch(urls, {
	    method: 'POST',
	    headers: {
	    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value // Incluir el token CSRF en los encabezados
    	},
    	body: formData
	})
	.then(response => {
    	// Manejar la respuesta del servidor
        if (response.ok) {
            if ( urls == 'http://127.0.0.1:8000/login/' && response.status == 200 ) {
                requestViewsUser('http://127.0.0.1:8000/')
            }
            else if ((urls == 'http://127.0.0.1:8000/register/' || urls == 'http://127.0.0.1:8000/pass/') && response.status == 200 ) {
                requestViewsUser('http://127.0.0.1:8000/login/')
            }
        }
  	})
};

// cargar vistas distintas
function requestViewsUser(urls) {
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
    	if (urls == 'http://127.0.0.1:8000/') {
            document.body.innerHTML = data
            eval(document.getElementById('iniciojs').innerText)
        }
        else{
        	contenedor.innerHTML = data
        }
        if (urls == 'http://127.0.0.1:8000/login/') {
            request_dynamic_script_user(1)
        } 
        else if (urls == 'http://127.0.0.1:8000/register/') {
            request_dynamic_script_user(2)
        } 
        else if (urls == 'http://127.0.0.1:8000/pass/') {
            request_dynamic_script_user(3)
        }

    });
}

//cargar login
window.addEventListener('load',()=>{

    contenedor = document.getElementById('contenedor');

    const request = new Request(
        'http://127.0.0.1:8000/sala/',
        {
            method: 'GET',
            mode: 'same-origin',
        });
    fetch(request)
    .then((response) => {
        if (response.ok) {
            return response.text();
        }
        throw new Error('Network response was not ok.');
    })
    .then(function(data) {
        contenedor.innerHTML = data
        // request_dynamic_script_user(1)
    });

})

sala.addEventListener('click',()=>{
	window.event.preventDefault();
    requestViewsUser('http://127.0.0.1:8000/sala/')
});

usuario.addEventListener('click',()=>{
	window.event.preventDefault();
    requestViewsUser('http://127.0.0.1:8000/login/')
});