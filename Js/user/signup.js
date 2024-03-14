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
	input.classList.remove('success')
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

// definition of the validInputs function 
const validInputs = () => {
	const userNameValue = userName.value.trim();
	const userEmailValue = userEmail.value.trim();
	const userPasswordValue = userPassword.value.trim();

// name validation conditions
if(userNameValue === ''){
	defineError(userName, 'Your full name is required');
} else {
	defineSuccess(userName);
}

//email validation conditions
if(userEmailValue === ''){
	defineError(userEmail, 'Your Email is required');
} else if(!isEmailValid(userEmailValue)){
	defineError(userEmail, 'Provide a valid email address');
} else {
	defineSuccess(userEmail);
}

// password validation conditions
if(userPasswordValue === ''){
	defineError(userPassword, 'password is required to protect your account');
} else if(userPasswordValue.length < 6) {
	defineError(userPassword, 'Password must be at least 6 characters in length')
} else if (!/[0-9]/.test(userPasswordValue)) {
    defineError(userPassword, 'Password must include at least one number');
} else {
	defineSuccess(userPassword);
}

}


