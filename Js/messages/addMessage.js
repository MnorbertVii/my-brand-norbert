const queriesBox = document.getElementById("messages-container");
const off = document.getElementById("notificationsOff");
const on = document.getElementById("notificationsOn");
const queries = JSON.parse(localStorage.getItem("queries")) || [];
var h1;

queriesBox.innerHTML = "";
queries.forEach((query) => {
  const singleQuery = `
		<h3>${query.userName}</h3>
		<p>${query.userMessage}</p>
		<h4>Reply</h4>
		`;
  queriesBox.innerHTML += singleQuery;
});

if (queries.length > 0) {
  on.style.display = "block";
  off.style.display = "none";
} else {
  on.style.display = "none";
  off.style.display = "block";
  const defaultDisplay = document.createElement(h1);
  defaultDisplay.textContent = "! Oops your inbox is empty";
  defaultDisplay.style.color = "#fca311";
  defaultDisplay.style.fontSize = "2em";
  queriesBox.appendChild(defaultDisplay);
}