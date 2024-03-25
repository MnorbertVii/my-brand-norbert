import { invalid, valid, isEmailValid, alertDisplay } from "./signup.js";

const form1 = document.forms['signInForm'];
const userEmail = document.getElementById('email');
const userPassword = document.getElementById('key');

form1.addEventListener('submit', e => {
	e.preventDefault();

	validInputs();
	
})

function validInputs (){
	const EmailValue = userEmail.value.trim();
	const PasswordValue = userPassword.value.trim();
	let isValid = true; 

	if(EmailValue === ''){
		invalid(userEmail, 'enter your email');
		isValid = false; 
	} else if(!isEmailValid(EmailValue)){
		invalid(userEmail, 'provide valid email address');
		isValid = false; 
	} else {
		valid(userEmail);
	}

	if(PasswordValue === ''){
		invalid(userPassword, 'enter your password')
	} else {
		valid(userPassword);
	}

	if(isValid){
		loginUser(EmailValue, PasswordValue);
	}
}
		function loginUser(email, password){
			let users = JSON.parse(localStorage.getItem('users')) || [];
			let authenticatedUsers = JSON.parse(localStorage.getItem('authenticated users')) || [];
            let user = users.find (user => user.email === email);
			if(!user){
				alertDisplay('Email does not exist')
				return;
			}
			if (user && user.password === password){

				authenticatedUsers.push(user);
				localStorage.setItem('authenticatedUsers', JSON.stringify(authenticatedUsers));
				alertDisplay('Login Successful');

				setTimeout (() => {
					
					if (user.role === 'admin' ){
						window.location.href = '../admin.html';
					} else {
						window.location.href = '../index.html#home';
					}
				},3500);

			} else {
				alertDisplay ("Password is incorrect");
			}
		}