import { invalid, valid,isEmailValid, alertDisplay } from "../user/signup.js";
const form = document.forms['contact-form'];
const userName = document.getElementById('name');
const userEmail = document.getElementById('email');
const userMessage = document.getElementById('message');

form.addEventListener('submit', e => {
	e.preventDefault();

	validInputs();
})

const validInputs = () => {
	let userNameValue = userName.value.trim();
		let userEmailValue = userEmail.value.trim();
		let userMessageValue = userMessage.value.trim();
		let isValid = true;
	
	// name validation conditions
	if(userNameValue === ''){
		invalid(userName, 'Your full name is required');
		isValid = false;
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
	} else {
		valid(userEmail);
	}
	
	// message validation conditions
	if(userMessageValue === ''){
		invalid(userMessage, "this field can't be blank");
		isValid = false;
	} else if(userMessageValue.length < 10) {
		invalid(userMessage, "Message can't be less than 10 characters")
		isValid = false;
	} else {
		valid(userMessage);
	}
	if(isValid){
		createMessage(userNameValue, userEmailValue, userMessageValue);

		const sendButton = document.getElementById('send-btn');
		sendButton.textContent = 'Sent';
		sendButton.style.backgroundColor = '#fca311';

		setTimeout( () => {
			sendButton.textContent = 'send message ';
			sendButton.style.backgroundColor = '#dcc9aa'; // Or your original button color
		  }, 3000);
}
}
function createMessage (name, email, message){
	const newMessage = {
		userName: name,
		userEmail: email,
		userMessage: message
	}
	let queries = JSON.parse(localStorage.getItem('queries')) || [];
	queries.push(newMessage);
	localStorage.setItem('queries', JSON.stringify(queries));

	userName.value = '';
	userEmail.value = '';
	userMessage.value = '';
}

