// seleccionando btn
var btn_login = document.getElementById('loginuser');
var form_register = document.querySelector('form');
var btn_pass = document.getElementById('passuser');

//campos de registro
var inp_username = document.getElementById('username');
var inp_email = document.getElementById('email');
var inp_pass = document.getElementById('password');
var inp_conf_pass = document.getElementById('confirm_password');


//botones principales 
btn_login.addEventListener('click',()=>{
	window.event.preventDefault();
    requestViewsUser('http://127.0.0.1:8000/login/')
});
form_register.addEventListener('submit',()=>{
	window.event.preventDefault();
    requestFormUser('http://127.0.0.1:8000/register/')
});
btn_pass.addEventListener('click',()=>{
	window.event.preventDefault();
    requestViewsUser('http://127.0.0.1:8000/pass/')
});