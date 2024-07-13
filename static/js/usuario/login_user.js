// seleccionando btn
var form_login = document.querySelector('form');
var btn_register = document.getElementById('registeruser');
var btn_pass = document.getElementById('passuser');

var inp_username = document.getElementById('username');
var inp_pass = document.getElementById('password');

//botones principales 
form_login.addEventListener('submit',()=>{
	window.event.preventDefault();
    requestFormUser('http://127.0.0.1:8000/login/')
});
btn_register.addEventListener('click',()=>{
	window.event.preventDefault();
    requestViewsUser('http://127.0.0.1:8000/register/')
});
btn_pass.addEventListener('click',()=>{
	window.event.preventDefault();
    requestViewsUser('http://127.0.0.1:8000/pass/')
});