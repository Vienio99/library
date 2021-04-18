// List for user's book

let myLibrary = [];

form = document.forms[0];

// Book constructor

function Book(id, author, title, pages, status) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
}

// Examples 

function addExamples() {
    book = new Book(1, 'J. R. R. Tolkien', 'Lord Of The Rings', '564', 'Read');
    book2 = new Book(2, 'J. K. Rowling', 'Harry Potter', '752', 'Not read');
    book3 = new Book(3, 'J. K. Rowling', 'Harry Potter', '752', 'Not read');
    book4 = new Book(4, 'J. K. Rowling', 'Harry Potter', '752', 'Not read');
    myLibrary.push(book);
    myLibrary.push(book2);
    myLibrary.push(book3);
    myLibrary.push(book4);
}

addExamples();

// Helper functions

function addBookToLibrary() {
    id = myLibrary.length + 1
    book = new Book(id, form.author.value, form.title.value, form.pages.value, form.status.value);
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
        id = myLibrary[i].id;
        createBookContainer(id);
    }
}

function createBookContainer(id) {

    let bookFromList = myLibrary.find(bookFromList => bookFromList.id === id)
    book = document.createElement('div');
    book.classList.add('book')
    book.setAttribute('id', id)
    books.appendChild(book);

    bookContent = document.createElement('div')
    bookContent.classList.add('book-content')
    book.appendChild(bookContent)
    
    author = document.createElement('p')
    author.textContent = bookFromList.author;
    bookContent.appendChild(author);

    title = document.createElement('h2');
    title.textContent = bookFromList.title;
    bookContent.appendChild(title);

    pages = document.createElement('p');
    pages.textContent = bookFromList.pages + ' pages';
    bookContent.appendChild(pages);

    buttons = document.createElement('div')
    buttons.classList.add('buttons');
    bookContent.appendChild(buttons);

    editStatus = document.createElement('button');
    editStatus.classList.add('edit-status');
    editStatus.textContent = bookFromList.status;
    buttons.appendChild(editStatus);

    remove = document.createElement('button');
    remove.classList.add('remove-book');
    remove.textContent = 'Remove';
    buttons.appendChild(remove);
}

function cleanDisplay() {
    while (books.firstChild) {
        books.removeChild(books.firstChild)
    }
}

displayBooks();




// Modal

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

const bookContainers = document.querySelector('.books')

bookContainers.addEventListener('click', (e) => {
    if (e.target && e.target.className === 'edit-status') {
        bookId = e.target.parentNode.parentNode.parentNode.id;
        console.log(bookId)
        book = myLibrary.find(book => book.id === Number(bookId))
        if (book.status === 'Read') {
            book.status = 'Not read';
            e.target.textContent = book.status;
        } else {
            book.status = 'Read';
            e.target.textContent = book.status;
    }}
})


bookContainers.addEventListener('click', (e) => {
    console.log(e.target)
    if (e.target && e.target.className === 'remove-book') {
        bookId = e.target.parentNode.parentNode.parentNode.id;
        book = myLibrary.find(book => book.id === Number(bookId));
        bookIndex = myLibrary.indexOf(book)
        myLibrary.splice(bookIndex, 1)
        cleanDisplay();
        displayBooks();
    }
})
