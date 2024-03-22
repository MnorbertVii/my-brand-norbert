const form = document.forms["signUpForm"];
const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("key");

if(form){
// add event listener to prevent default submission of the form
form.addEventListener('submit', e => {
	e.preventDefault();

	validInputs();
});
}



// definition of an error function
export const invalid = (element, message) => {
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

// definition of a success function
export const valid = element => {
	const input = element.parentElement;
	const error = input.querySelector('.err');

	error.innerText = '';
	input.classList.remove('err')
}

// check for a valid email
export const isEmailValid = email => {
	const EmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return EmailRegex.test(String(email).toLowerCase());
}

//check for a valid full name
export const isNameValid = username => {
	const NameRegex = /^[A-Z][a-z]{2,}(?: [A-Z][a-z]{2,})*$/; 
	// ^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$;
	return NameRegex.test(username);
}

//definition of alert
export const alertDisplay = message => {
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
export const validInputs = () => {
	let userNameValue = userName.value.trim();
	let userEmailValue = userEmail.value.trim();
	let userPasswordValue = userPassword.value.trim();
	let isValid = true;

// name validation conditions
if(userNameValue === ''){
	invalid(userName, 'Your full name is required');
	isValid = false;
} else if(!isNameValid(userNameValue)) {
	invalid(userName, 'Provide a reasonable full name')
} else {
	valid(userName);
}

//email validation conditions
if(userEmailValue === ''){
	invalid(userEmail, 'Your Email is required');
	isValid = false;
} else if(!isEmailValid(userEmailValue)){
	invalid(userEmail, 'Provide a valid email address');
	isValid = false;
} else if(isEmailTaken(userEmailValue)){
	alertDisplay('Sorry, email is already taken');
	return false;
}
 else {
	valid(userEmail);
}

// password validation conditions
if(userPasswordValue === ''){
	invalid(userPassword, 'password is required to protect your account');
	isValid = false;
} else if(userPasswordValue.length < 6) {
	invalid(userPassword, 'Password must be at least 6 characters in length')
	isValid = false;
} else if (!/[0-9]/.test(userPasswordValue)) {
    invalid(userPassword, 'Password must include at least one number');
	isValid = false;
} else {
	valid(userPassword);
}

// registering user
if(isValid){
	registerUser(userNameValue, userEmailValue, userPasswordValue);
}
}
	const registerUser = (Name, Email, Password) => {

	let users = JSON.parse(localStorage.getItem('users')) || [];
    let role = Email === 'nimuhnorbert@gmail.com' ? 'admin' : 'user';
	const newUser = {
		id: crypto.randomUUID(),
		name: Name,
		email: Email,
		password: Password,
		role: role
	};

	users.push(newUser);
	localStorage.setItem('users', JSON.stringify(users));
    alertDisplay('Registration successful now login');
	
	setTimeout (() => {
		window.location.href = '../signin.html';
	}, 3500);

	userName.value = '';
	userEmail.value = '';
	userPassword.value = '';
}
