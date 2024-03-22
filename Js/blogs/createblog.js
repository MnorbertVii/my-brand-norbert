import { invalid, valid, alertDisplay } from "../user/signup.js";

const createForm = document.forms['createForm'];
const title = document.getElementById('title');
const image = document.getElementById('photo');
const desc = document.getElementById('description');

createForm.addEventListener('submit', e => {
	e.preventDefault();

	validInputs();
	
})

function validInputs (){
	const titleValue = title.value.trim();
	const descriptionValue = desc.value.trim();
	const file = image.files && image.files[0];

	let isValid = true; 

	if(titleValue === ''){
		invalid(title, "Title can't be blank");
		isValid = false; 
	} else if(titleValue.length < 5){
		invalid(title, 'Title must be at least 5 characters');
		isValid = false; 
	} else {
		valid(title);
	}

	if(descriptionValue === ''){
		invalid(desc, 'write description of your blog')
	} else if(descriptionValue.length < 20){
		invalid(desc, 'Too short');
	} else {
		valid(desc);
	}

	if(!file) {
		invalid(image, 'Upload photo for the blog');
		isValid = false;
	} else {
		valid(image)
	}
	if(isValid){
		createBlog(titleValue, file, descriptionValue);
	}
}

const createBlog = (title, image, description) => {
    if(image){
        let reader = new FileReader();
        reader.onload = function (e) {
            let featuredArticles = JSON.parse(localStorage.getItem('featuredArticles')) || [];
            let newBlog = {
				id: crypto.randomUUID(),
                title: title,
                image: e.target.result,
                body: description
            };
            featuredArticles.push(newBlog);
            localStorage.setItem('featuredArticles', JSON.stringify(featuredArticles));
            alertDisplay('Blog Created Successfully');

			document.getElementById('title').value = '';
			document.getElementById('photo').value = '';
			document.getElementById('description').value = '';

        };
        reader.readAsDataURL(image);
    } else {
        alertDisplay('Please upload an image for the blog');
    }
}