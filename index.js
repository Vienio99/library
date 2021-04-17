let myLibrary = ['The Lord Of The Rings', 'Harry Potter', 'Hobbit', 'The Name of The Wind', 'Golden compass', 'Shadow of The Gods'];


function Book(author, title, pages, status) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary() {
    // do stuff here
  }


const books = document.querySelector('.books');
function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        book = document.createElement('div');
        book.textContent = myLibrary[i];
        books.appendChild(book);
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
    console.log(e.target)
    if (e.target === modal) {
        modal.style.display = "none";
    }
})
