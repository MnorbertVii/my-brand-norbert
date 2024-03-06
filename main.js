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
function showMenubar() {
	const menubar = document.querySelector(".nav-links");
	menubar.style.display = "flex";
  }
  function hideMenubar(){
	const menubar = document.querySelector(".nav-links");
	menubar.style.display = "none";
  }
