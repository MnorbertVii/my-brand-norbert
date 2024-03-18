// show active nav bar on click and on scroll
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.links ul li a');
let smallNavLinks = document.querySelectorAll('.nav-links a');
window.onscroll = () => {
	sections.forEach(sec => {
		let top = window.scrollY;
		let offset = sec.offsetTop - 200;
		let height = sec.offsetHeight;
		let id = sec.getAttribute('id');

		if(top >= offset && top < offset + height){
			navLinks.forEach(links => {
				links.classList.remove('active');
				document.querySelector('.links ul li a[href*=' + id + ']').classList.add('active');
			})
			smallNavLinks.forEach(smallLink => {
				smallLink.classList.remove('active');
				document.querySelector('.nav-links a[href*=' + id + ']').classList.add('active')

			})

		};
	});
};

// show and hide side bar functions
function showMenubar () {
	const menubar = document.querySelector(".nav-links");
	menubar.style.display = "flex";
  }
  function hideMenubar(){
	const menubar = document.querySelector(".nav-links");
	menubar.style.display = "none";
  }

//log out a user
document.addEventListener('DOMContentLoaded', (e) => {
	let authenticatedUsers = JSON.parse(localStorage.getItem('authenticatedUsers')) || [];
	console.log(authenticatedUsers);
	if(authenticatedUsers.length > 0){
		let signInLi = document.querySelector('#signInLi');
		let signInLi2 = document.querySelector('#signInLi2');
		

		if(signInLi || signInLi2){
			signInLi.textContent = 'Sign out';
			signInLi.href = 'index.html';
			signInLi2.textContent = 'Sign out';
			signInLi2.href = 'index.html';
		}
		if(signInLi2 || signInLi){

			signInLi2.addEventListener('click', () => {
				if(signInLi2.textContent === 'Sign out'){
					localStorage.removeItem('authenticatedUsers');
					signInLi2.textContent = 'Sign in';
					window.location.href = 'index.html';
				}
			})
			signInLi.addEventListener('click', () => {
				if(signInLi.textContent === 'Sign out'){
					localStorage.removeItem('authenticatedUsers');
					signInLi.textContent = 'Sign in';
					window.location.href = 'index.html';
				}
			})

		}
	}
});