const form = document.forms['signInForm'];
const userEmail = document.getElementById('email');
const userPassword = document.getElementById('key');
const alert = document.getElementsByClassName('alert');

form.addEventListener('submit', e => {
	e.preventDefault();

	validInputs();
	
})


function invalid (element, message){
	const input = element.parentElement;
	const error = input.querySelector('.err');

	error.innerText = message;
	input.classList.add('err');
	if(message){
		input.classList.add('.err');
		input.addEventListener('animationend', () => {
			input.classList.remove('err');
		},{once:true});
	}
}

function isEmailValid(email){
	const EmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return EmailRegex.test(String(email).toLowerCase());
}

function valid (element){
	const input = element.parentElement;
	const error = input.querySelector('.err');

	error.innerText = '';
	input.classList.remove('err');
}

function alertDisplay(message){
	var alert =document.getElementsByClassName("alert");
	alert[0].innerHTML = message;
	alert[0].style.display = "block";
	setTimeout(function(){
		alert[0].style.display = 'none';
	}, 3000)
}

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
	} else if(PasswordValue.length < 6){
		invalid(userPassword, 'Password must be at least 6 characters');
	} else if(!/[0-9]/.test(PasswordValue)){
		invalid(userPassword, 'Password must contain a number')
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
				window.location.href = 'index.html#blogs';

				authenticatedUsers.push(user);
				localStorage.setItem('authenticatedUsers', JSON.stringify(authenticatedUsers));
				alertDisplay('Login Successful');

			} else {
				alertDisplay ("Password is incorrect");
			}
		}