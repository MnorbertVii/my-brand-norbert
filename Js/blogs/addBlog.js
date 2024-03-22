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
        <a href="singleblog.html">
          <span class="action-icons" id="view-icon">
            <img src="/assets/images/eye.svg" alt="" />
          </span>
        </a>
        <a href="singleblog.html">
          <span class="action-icons" id="edit-icon">
            <img src="/assets/images/edit.svg" alt="" />
          </span>
        </a>
        <a href="singleblog.html">
          <span class="action-icons" id="delete-icon">
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
                  <img src="assets/images/Vector like.svg" alt="like" />
                  <p>10 likes</p>
                </div>
                <div class="comments">
                  <a href="singleblog.html"
                    ><img src="assets/images/Vector.svg" alt="comment"
                  /></a>
                  <p>1 comment</p>
                </div>
              </div>
            </div>
      `;

      blogContents.innerHTML += blog;
    })
  }
        
  if (Articles.length === 0) {
    const noBlogsMessage = document.createElement('h1');
    noBlogsMessage.textContent = 'There are no blogs to display.';
    noBlogsMessage.style.textAlign = 'center';
    noBlogsMessage.style.color = '#dcc9aa';
    blogContents.appendChild(noBlogsMessage);
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
  <form>
  <input type="text" placeholder="Name">
  <textarea class="style-input" placeholder="comment"></textarea>
  <button class="comment-btn">send</button>
  </form>
    `;
  }


});
