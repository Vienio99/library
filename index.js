let myLibrary = [];

form = document.forms[0];

function Book(author, title, pages, status) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
}

function addExamples() {
    book = new Book('J. R. R. Tolkien', 'Lord Of The Rings', '564', 'read');
    book2 = new Book('J. K. Rowling', 'Harry Potter', '752', 'not read');
    book3 = new Book('J. K. Rowling', 'Harry Potter', '752', 'not read');
    book4 = new Book('J. K. Rowling', 'Harry Potter', '752', 'not read');
    myLibrary.push(book);
    myLibrary.push(book2);
    myLibrary.push(book3);
    myLibrary.push(book4);
}

addExamples();


function addBookToLibrary() {
    book = new Book(form.author.value, form.title.value, form.pages.value, form.status.value);
    console.log(myLibrary)
    myLibrary.push(book);
    cleanDisplay();
    displayBooks();
  }

const submit = document.querySelector('#submit')
submit.addEventListener('click', () => {
    addBookToLibrary();
    form.reset();
})



const books = document.querySelector('.books');
function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        book = document.createElement('div');
        books.appendChild(book);

        author = document.createElement('p')
        author.textContent = myLibrary[i].author;
        book.appendChild(author);

        title = document.createElement('h2');
        title.textContent = myLibrary[i].title;
        book.appendChild(title);

        pages = document.createElement('p');
        pages.textContent = myLibrary[i].pages;
        book.appendChild(pages);

        readStatus = document.createElement('p')
        readStatus.textContent = myLibrary[i].status;
        book.appendChild(readStatus);
    }
}

function cleanDisplay() {
    while (books.firstChild) {
        books.removeChild(books.firstChild)
    }
}

displayBooks();

const newBook = document.querySelector('#new-book button')


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
