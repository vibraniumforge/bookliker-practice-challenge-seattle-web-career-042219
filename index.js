document.addEventListener("DOMContentLoaded", function() {
  getBooks();
});

const booksUrl = "http://localhost:3000/books";
let viewBoolean = true;

function getBooks() {
  fetch(booksUrl)
    .then(result => result.json())
    .then(books => renderBooks(books))
    .catch(err => console.log("Error", err));
}

function renderBooks(books) {
  books.forEach(book => renderBook(book));
}

function renderBook(book) {
  let bookList = document.getElementById("list");
  let li = document.createElement("li");
  li.textContent = "Title:" + book.title;
  li.addEventListener("click", () => showBoook(book));
  bookList.appendChild(li);
}

function showBoook(book) {
  let showPanel = document.getElementById("show-panel");
  let div = document.createElement("div");
  let pID = document.createElement("p");
  let h3 = document.createElement("h3");
  let pDesc = document.createElement("p");
  let img = document.createElement("img");
  let ul = document.createElement("ul");
  ul.id = "userList";

  let button = document.createElement("button");

  pID.textContent = "ID: " + book.id;
  h3.textContent = "Title: " + book.title;
  pDesc.textContent = "ID: " + book.description;
  img.src = book.img_url;
  button.textContent = "Like This Book";
  button.addEventListener("click", () => addLike(book));

  showPanel.innerHTML = "";

  div.appendChild(pID);
  div.appendChild(h3);
  div.appendChild(pDesc);
  div.appendChild(img);
  for (let i = 0; i < book.users.length; i++) {
    let li = document.createElement("li");
    li.textContent = `{"id":${book.users[i].id}, "username":${
      book.users[i].username
    }   
    }`;
    ul.appendChild(li);
  }
  div.appendChild(ul);
  div.appendChild(button);
  showPanel.appendChild(div);
}

function addLike(book) {
  let bookId = book.id;

  let li = document.createElement("li");
  li.textContent = `{"id":1, username:"pouros" }`;
  li.id = "userLi";

  let users = document.getElementById("userList");
  if (users.innerHTML) {
    viewBoolean = !viewBoolean;
    console.log("viewBoolean=", viewBoolean);
  } else {
    users.appendChild(li);
    letviewBoolean = true;
  }

  let appendedLi = document.getElementById("userLi");

  fetch(booksUrl + "/" + bookId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ users: users })
  })
    .then(response => {
      return response.json();
    })
    .then(book => {
      viewBoolean
        ? appendedLi.classList.remove("hidden")
        : appendedLi.classList.add("hidden");
    })
    .catch(err => console.log(err));
}
