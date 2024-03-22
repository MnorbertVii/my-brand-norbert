import { alertDisplay } from "../user/signup.js";

document.addEventListener("DOMContentLoaded", () => {
  const getArticles = () =>
    JSON.parse(localStorage.getItem("featuredArticles")) || [];
  const saveArticles = (articles) =>
    localStorage.setItem("featuredArticles", JSON.stringify(articles));

  const updateForm = (article) => {
    document.getElementById("title").value = article.title;
    document.getElementById("description").value = article.body;
    let currentImageDisplay = document.getElementById("current-image-display");
    if (currentImageDisplay) {
      currentImageDisplay.src = article.image;
      currentImageDisplay.style.display = "block";
    }
  };

  const editArticle = (articleId) => {
    const articles = getArticles();
    const articleToEdit = articles.find((article) => article.id === articleId);
    if (articleToEdit) {
      updateForm(articleToEdit);
      document.getElementById("edit-article-id").value = articleId;
    } else {
      console.error("Article not found");
    }
  };

  const editIcons = document.querySelectorAll("#edit-icon");
  editIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      const articleDataId = icon.getAttribute("articleDataId");
      editArticle(articleDataId);
    });
  });

  const createForm = document.forms["createForm"];
  createForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const articles = getArticles();
    const articleId = document.getElementById("edit-article-id").value;

    const articleIndex = articles.findIndex(
      (article) => article.id === articleId
    );

    if (articleIndex !== -1) {
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const imageFile = document.getElementById("photo").files[0];
      if (imageFile) {
        let reader = new FileReader();
        reader.onload = function (e) {
          articles[articleIndex].title = title;
          articles[articleIndex].body = description;
          articles[articleIndex].image = e.target.result;
          saveArticles(articles);
          alertDisplay("Article updated successfully");
          document.getElementById("title").value = "";
          document.getElementById("photo").value = "";
          document.getElementById("description").value = "";
		  currentImageDisplay.style.display = "block";
        };
        reader.readAsDataURL(imageFile);
      }
    }
  });
});
