document.addEventListener("DOMContentLoaded", () => {
  let Articles = JSON.parse(localStorage.getItem("featuredArticles")) || [];

  let tableBody = document.getElementById("tableBody");
  if(tableBody){

    tableBody.innerHTML = "";
    Articles.forEach((article) => {
      const smallDescription = article.body.slice(0, 30);
      const blog = `

      <tr>
      <td>${article.title}</td>
      <td>
        <img
          class="blog-img"
          src="${article.image}"
          alt="blog image"
        />
      </td>
      <td>${smallDescription}</td>
      <td>
        <a href="index.html#blogs">
          <span class="action-icons" id="view-icon">
            <img src="/assets/images/eye.svg" alt="" />
          </span>
        </a>
        <a
          <span class="action-icons" id="edit-icon" articleDataId = "${article.id}">
            <img src="/assets/images/edit.svg" alt="" />
          </span>
        </a>
        <a
          <span class="action-icons" id="delete-icon" articleDataId = "${article.id}">
            <img src="/assets/images/trash.svg" alt="" />
          </span>
        </a>
      </td>
    </tr>
  `;
      tableBody.innerHTML += blog;

  
    });
    if (Articles.length === 0) {
      const noBlogsMessage = document.createElement('h1');
      noBlogsMessage.textContent = 'There are no blogs to display.';
      noBlogsMessage.style.textAlign = 'center';
      noBlogsMessage.style.color = '#fca311';
      tableBody.appendChild(noBlogsMessage);
    }
  }



  let blogContents = document.getElementById('blog-contents');
  if(blogContents){
    blogContents.innerHTML = '';
    Articles.forEach((article, index) => {
      localStorage.setItem('article_' + index, article.id);
      const smallDescription = article.body.slice(0, 30);
      const commentCount = countCommentsForArticle(article.id);
      const blog = `
      <div class="first-blog grid">
              <img src="${article.image}" alt="avatar" />
              <h4>${article.title}</h4>
              <p>
                ${smallDescription}
                <a href="singleblog.html?id=${index}" class="style-link">more</a>
              </p>
  
              <div class="likes-comments">
              <div class="likes">
              <img
                src="assets/images/Vector like.svg"
                alt="like"
                class="like-icon"
                articleDataId="${article.id}"
              />
              <p class="like-count">0 likes</p>
            </div>
                <div class="comments">
                  <a href="singleblog.html?id=${index}"
                    ><img src="assets/images/Vector.svg" alt="comment"
                  /></a>
                  <p id="comment-count"> ${commentCount} ${commentCount !== 1 ? 'comments' : 'comment'}</p>
                </div>
              </div>
            </div>
      `;

      blogContents.innerHTML += blog;
    })
    if (Articles.length === 0) {
      const noBlogsMessage = document.createElement('h1');
      noBlogsMessage.textContent = 'There are no blogs to display.';
      noBlogsMessage.style.textAlign = 'center';
      noBlogsMessage.style.color = '#dcc9aa';
      blogContents.appendChild(noBlogsMessage);
    }
  }
        

  function getArticleById(id) {
    return Articles.find(article => article.id === id);
  }

  const urlParams = new URLSearchParams(window.location.search);
  const articleIndex = urlParams.get('id');
  const articleId = localStorage.getItem('article_' + articleIndex);
  const articleData = getArticleById(articleId);
  
 
  if (articleData) {
    const articleContainer = document.getElementById('article-container');
    articleContainer.innerHTML = `
    <h3 id="blog-title">${articleData.title}</h3>
    <img src="${articleData.image}" alt="avatar" id="blog-image"/>
    <p class="leading" id="blog-description">
      ${articleData.body}
    </p>
  <form id="comment-form">
  <input type="text" id="name-input" placeholder="Name">
  <textarea class="style-input" id ="comment-input" placeholder="comment"></textarea>
  <button class="comment-btn" id="send-comment-btn" articleDataId="${articleData.id}">send</button>
  <div class="comments" id="comments-section">
      <h5 id="comment-count">0 comments</h5>
      <div id="comment-list"></div>
    </div>
  </form>
    `;
    loadComments();
    document.getElementById('send-comment-btn').addEventListener('click', (e) => {
      e.preventDefault();
      const articleId = e.target.getAttribute("articleDataId");
      addComment(articleId);
    });
  }

  const likeIcons = document.querySelectorAll(".like-icon");
  likeIcons.forEach((icon) => {
    const articleId = icon.getAttribute("articleDataId");
    const isLiked = localStorage.getItem(`liked_${articleId}`) === 'true';
    const likeCountElement = icon.nextElementSibling;
    likeCountElement.textContent = isLiked ? "1 like" : "0 likes";
    icon.addEventListener("click", addLike);
  });
  



});

function loadComments(currentArticleId) {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  const commentList = document.getElementById('comment-list');
  commentList.innerHTML = '';
  comments.forEach((comment, index) => {
    if (comment.currentArticleId === currentArticleId) {
    commentList.innerHTML += `
    <h4>${comment.name}</h4>
    <p>${comment.text}</p>
    <h5 id="delete" onclick="deleteComment(${index})">Delete</h5>
    `;
    }
  });
  document.getElementById('comment-count').textContent = `${comments.length} comment${comments.length !== 1 ? 's' : ''}`;
}

function addComment(articleId) {
  
  const nameInput = document.getElementById('name-input');
  const commentInput = document.getElementById('comment-input');
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.push({ articleId:articleId, name: nameInput.value, text: commentInput.value });
  localStorage.setItem('comments', JSON.stringify(comments));
  nameInput.value = '';
  commentInput.value = '';
  loadComments();
}

function deleteComment(index) {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.splice(index, 1);
  localStorage.setItem('comments', JSON.stringify(comments));
  loadComments();
}


function addLike(event) {
  const icon = event.target;
  const articleId = icon.getAttribute("articleDataId");
  const likeCountElement = icon.nextElementSibling;
  const isLiked = localStorage.getItem(`liked_${articleId}`) !== 'true';
  localStorage.setItem(`liked_${articleId}`, isLiked);
  const newLikes = isLiked ? 1 : 0;
  likeCountElement.textContent = `${newLikes} like${newLikes !== 1 ? "s" : ""}`;
}

function countCommentsForArticle(articleId) {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  return comments.filter(comment => comment.articleId === articleId).length;
}

