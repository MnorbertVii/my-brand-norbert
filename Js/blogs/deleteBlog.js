document.addEventListener("DOMContentLoaded", () => {
	
  const getArticles = () => JSON.parse(localStorage.getItem("featuredArticles")) || [];
  const saveArticles = (articles) => localStorage.setItem("featuredArticles", JSON.stringify(articles));
  const deleteArticle = (articleId) => {
    const articles = getArticles();
    const filteredArticles = articles.filter(article => article.id !== articleId);
    saveArticles(filteredArticles);
	updateTable();
  };

      const deleteIcons = document.querySelectorAll('#delete-icon');
      deleteIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
			event.preventDefault();
          const articleId = icon.getAttribute('articleDataId');
          deleteArticle(articleId);
          
        });
      });


	  const updateTable = () => {
		const tableBody = document.getElementById("tableBody");
		tableBody.innerHTML = ""; // Clear the table body
		const articles = getArticles();
		articles.forEach((article) => {
		  const smallDescription = article.body.slice(0, 50);
		  const blog = `
			<tr>
			  <td>${article.title}</td>
			  <td>
				<img class="blog-img" src="${article.image}" alt="blog image" />
			  </td>
			  <td>${smallDescription}</td>
			  <td>
				<a href="index.html#blogs">
				  <span class="action-icons view-icon">
					<img src="/assets/images/eye.svg" alt="" />
				  </span>
				</a>
				<span class="action-icons" id="edit-icon" articleDataId="${article.id}">
				  <img src="/assets/images/edit.svg" alt="" />
				</span>
				<span class="action-icons" id="delete-icon" articleDataId="${article.id}">
				  <img src="/assets/images/trash.svg" alt="" />
				</span>
			  </td>
			</tr>
		  `;
		  tableBody.innerHTML += blog;
		});
	  };

    });

