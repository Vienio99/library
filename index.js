let myLibrary = [];

form = document.forms[0];

function Book(author, title, pages, status) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary() {
    book = new Book(form.author.value, form.title.value, form.pages.value, form.status.value);
    myLibrary.push(book);
    cleanDisplay();
    displayBooks();
  }

const submit = document.querySelector('#submit')
submit.addEventListener('click', () => {
    addBookToLibrary();
})



const books = document.querySelector('.books');
function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        title = document.createElement('div');
        title.textContent = myLibrary[i].title;
        books.appendChild(title);
    }
}

function cleanDisplay() {
    while (books.firstChild) {
        books.removeChild(books.firstChild)
    }
}

displayBooks();

const newBook = document.querySelector('#new-book')


const modal = document.querySelector(".modal")
const closeBtn = document.querySelector(".close-btn")


newBook.addEventListener('click', () => {
    modal.style.display = "block";
})

closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
})

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
})
