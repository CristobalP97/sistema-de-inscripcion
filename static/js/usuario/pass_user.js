// seleccionando btn
var btn_login = document.getElementById('loginuser');
var btn_register = document.getElementById('registeruser');
var form_pass = document.querySelector('form');


//botones principales 
btn_login.addEventListener('click',()=>{
	window.event.preventDefault();
    requestViewsUser('http://127.0.0.1:8000/login/')
});
btn_register.addEventListener('click',()=>{
	window.event.preventDefault();
    requestViewsUser('http://127.0.0.1:8000/register/')
});
form_pass.addEventListener('submit',()=>{
	window.event.preventDefault();
    requestFormUser('http://127.0.0.1:8000/pass/')
});