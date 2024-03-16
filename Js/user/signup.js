const form = document.forms["signUpForm"];
const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("key");



// add event listener to prevent default submission of the form
form.addEventListener('submit', e => {
	e.preventDefault();

	validInputs();
});

// definition of an error function
const defineError = (element, message) => {
	const input = element.parentElement;
	const error = input.querySelector('.err');
    
	error.innerText = message;
	input.classList.add('err');
	input.classList.remove('success');
	if(message){
		input.classList.add('.err');
		input.addEventListener('animationend', () => {
			input.classList.remove('err');
		},{once:true});
	}
}

// definition of a success function
const defineSuccess = element => {
	const input = element.parentElement;
	const error = input.querySelector('.err');

	error.innerText = '';
	input.classList.add('success');
	input.classList.remove('err')
}

// check for a valid email
const isEmailValid = email => {
	const EmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return EmailRegex.test(String(email).toLowerCase());
}

//definition of alert
const alertDisplay = message => {
	var alert =document.getElementsByClassName("alert");
	alert[0].innerHTML = message;
	alert[0].style.display = "block";
	setTimeout(function(){
		alert[0].style.display = 'none';
	}, 3000)
}

// definition of existing email
const isEmailTaken = email => {
	let users = JSON.parse(localStorage.getItem('users')) || [];
	return users.some(user => user.email === email);
}

// definition of the validInputs function 
const validInputs = () => {
	let userNameValue = userName.value.trim();
	let userEmailValue = userEmail.value.trim();
	let userPasswordValue = userPassword.value.trim();
	let isValid = true;

// name validation conditions
if(userNameValue === ''){
	defineError(userName, 'Your full name is required');
	isValid = false;
} else {
	defineSuccess(userName);
}

//email validation conditions
if(userEmailValue === ''){
	defineError(userEmail, 'Your Email is required');
	isValid = false;
} else if(!isEmailValid(userEmailValue)){
	defineError(userEmail, 'Provide a valid email address');
	isValid = false;
} else if(isEmailTaken(userEmailValue)){
	alertDisplay('Sorry, email is already taken');
	return false;
}
 else {
	defineSuccess(userEmail);
}

// password validation conditions
if(userPasswordValue === ''){
	defineError(userPassword, 'password is required to protect your account');
	isValid = false;
} else if(userPasswordValue.length < 6) {
	defineError(userPassword, 'Password must be at least 6 characters in length')
	isValid = false;
} else if (!/[0-9]/.test(userPasswordValue)) {
    defineError(userPassword, 'Password must include at least one number');
	isValid = false;
} else {
	defineSuccess(userPassword);
}

// registering user
if(isValid){
	alertDisplay('Registration successful');
	let users = JSON.parse(localStorage.getItem('users')) || [];

	const newUser = {
		id: crypto.randomUUID(),
		name: userNameValue,
		email: userEmailValue,
		password: userPasswordValue
	};

	users.push(newUser);
	localStorage.setItem('users', JSON.stringify(users));

	userName.value = '';
	userEmail.value = '';
	userPassword.value = '';
}
}


