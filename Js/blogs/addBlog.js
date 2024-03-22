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
                  <p id="comment-count">0 comment</p>
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
  <button class="comment-btn" id="send-comment-btn">send</button>
  <div class="comments" id="comments-section">
      <h5 id="comment-count">0 comments</h5>
      
    </div>
  </form>
    `;
  }


  const likeIcons = document.querySelectorAll(".like-icon");
  likeIcons.forEach((icon) => {
    icon.addEventListener("click", addLike);
  });
  
  
  function addLike(event) {
  const articleId = event.target.getAttribute("articleDataId");
  const likeCountElement = event.target.nextElementSibling;
  const currentLikes = parseInt(likeCountElement.textContent, 10);
  
  
  const newLikes = currentLikes === 0 ? 1 : 0;
  likeCountElement.textContent = `${newLikes} like${newLikes !== 1 ? "s" : ""}`;
  
  console.log(`Article ${articleId}: ${newLikes} likes`);
  }


  // let totalComments = 0;

  // const sendCommentBtn = document.getElementById('send-comment-btn');
  // sendCommentBtn.addEventListener('click', addComment);

  // function addComment(event) {
  //   event.preventDefault();
  //   const name = document.getElementById('name-input').value;
  //   const comment = document.getElementById('comment-input').value;

    
  //   const commentElement = document.createElement('div');
  //   commentElement.classList.add('comment');
  //   commentElement.innerHTML = `
  //     <h4>${name}</h4>
  //     <p>${comment}</p>
  //   `;

  //   const commentsSection = document.querySelector('.comments');
  //   commentsSection.appendChild(commentElement);
  //   totalComments++;
  //   const commentCountElement = document.getElementById('comment-count');
  //   commentCountElement.textContent = `${totalComments} comment${totalComments !== 1 ? 's' : ''}`;
  // }

  let totalComments = 0;
  const existingComments = JSON.parse(localStorage.getItem('blogComments')) || [];

  
  const commentsSection = document.getElementById('comments-section');
  existingComments.forEach((comment) => {
    const commentElement = createCommentElement(comment.name, comment.text);
    commentsSection.appendChild(commentElement);
    totalComments++;
  });


  const sendCommentBtn = document.getElementById('send-comment-btn');
  sendCommentBtn.addEventListener('click', handleCommentSubmission);

  function handleCommentSubmission(event) {
    event.preventDefault();
    const name = document.getElementById('name-input').value;
    const comment = document.getElementById('comment-input').value;


    const commentElement = createCommentElement(name, comment);
    commentsSection.appendChild(commentElement);
    totalComments++;

  
    const commentCountElement = document.getElementById('comment-count');
    commentCountElement.textContent = `${totalComments} comment${totalComments !== 1 ? 's' : ''}`;

  
    const newComment = { name: name, text: comment };
    existingComments.push(newComment);
    localStorage.setItem('blogComments', JSON.stringify(existingComments));
  }

  function createCommentElement(name, comment) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `
      <h4>${name}</h4>
      <p>${comment}</p>
    `;
    return commentDiv;
  }
});




