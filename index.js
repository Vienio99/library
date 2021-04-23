// List for user's book

let myLibrary = [];

// Form

let form = document.forms[1];

// Book constructor

function Book(id, author, title, pages, status) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
}

// Form listener and save book to local storage

form.addEventListener('submit', (e) => {
    addBookToLocalLibrary(e);
    modal.style.display = "none";
})

function addBookToLocalLibrary(e) {
    e.preventDefault();
    let newBook = getBookFromInput();
    localStorage.setItem(newBook.id, JSON.stringify(newBook));  
    cleanDisplay();
    displayBooks();
  }


function getBookFromInput() {
    let id;
    if (localStorage.length === 0) {
        localStorage.setItem('lastId', 1)
        id = JSON.parse(localStorage.getItem('lastId'))
    } else {
        id = JSON.parse(localStorage.getItem('lastId')) + 1;
        localStorage.setItem('lastId', id)
    }
    return new Book(id, form.author.value, form.title.value, form.pages.value, form.status.value)
}


// 

function addLocalStorageForDisplay() {
    myLibrary = [];
    let lastBookId = JSON.parse(localStorage.getItem('lastId'));
    for (let i = 1; i < lastBookId + 1; i++) {
        if (localStorage.getItem(i)) {
            let parsedBook = JSON.parse(localStorage.getItem(i));
            myLibrary.push(parsedBook);
        }
    }
}



function displayBooks() {
    addLocalStorageForDisplay();
    for (let i = 0; i < myLibrary.length; i++) {
        let id = myLibrary[i].id;
        createBookContainer(id);
    }
}

const books = document.querySelector('.books');
function cleanDisplay() {
    while (books.firstChild) {
        books.removeChild(books.firstChild)
    }
}

displayBooks();


function createBookContainer(id) {

    let bookFromList = myLibrary.find(bookFromList => bookFromList.id === id)
    let book = document.createElement('div');
    book.classList.add('book')
    book.setAttribute('id', id)
    books.appendChild(book);

    let bookContent = document.createElement('div')
    bookContent.classList.add('book-content')
    book.appendChild(bookContent)
    
    let author = document.createElement('p')
    author.textContent = bookFromList.author;
    bookContent.appendChild(author);

    let title = document.createElement('h2');
    title.textContent = bookFromList.title;
    bookContent.appendChild(title);

    let pages = document.createElement('p');
    pages.textContent = bookFromList.pages + ' pages';
    bookContent.appendChild(pages);

    let buttons = document.createElement('div')
    buttons.classList.add('buttons');
    bookContent.appendChild(buttons);

    let editStatus = document.createElement('button');
    editStatus.classList.add('edit-status');
    editStatus.textContent = bookFromList.status;
    buttons.appendChild(editStatus);

    let remove = document.createElement('button');
    remove.classList.add('remove-book');
    remove.textContent = 'Remove';
    buttons.appendChild(remove);
}


// Modal

const newBook = document.querySelector('#main-buttons svg')
const modal = document.querySelector(".modal")
const closeBtn = document.querySelector(".close-btn")

newBook.addEventListener('click', () => {
    form.reset();
    modal.style.display = "block";
})


// Hide modal after clicking close button or clicking outside of it

closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
})


window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
})

// Edit book status

const bookContainers = document.querySelector('.books')
bookContainers.addEventListener('click', (e) => {
    if (e.target && e.target.className === 'edit-status') {
        let bookId = e.target.parentNode.parentNode.parentNode.id;
        let book = myLibrary.find(book => book.id === Number(bookId))
        if (book.status === 'Read') {
            book.status = 'Not read';
        } else {
            book.status = 'Read';
    }
    e.target.textContent = book.status;
    localStorage.setItem(bookId, JSON.stringify(book));
}})

// Remove book

bookContainers.addEventListener('click', (e) => {
    if (e.target && e.target.className === 'remove-book') {
        let eventBookId = e.target.parentNode.parentNode.parentNode.id;
        localStorage.removeItem(eventBookId);
        cleanDisplay();
        displayBooks();

        if (localStorage.length === 1) {
            localStorage.clear();
        }
    }
})

// Remove local storage

const removeLibrary = document.querySelector('.remove-library');
const modalRemove = document.querySelector(".modal-remove")
const closeBtnRemove = document.querySelector(".modal-remove-close-btn")

removeLibrary.addEventListener('click', () => {
    modalRemove.style.display = "block";
})

closeBtn.addEventListener('click', () => {
    modalRemove.style.display = "none";
})


window.addEventListener('click', (e) => {
    if (e.target === modalRemove) {
        modalRemove.style.display = "none";
    }
})


const formRemove = document.forms[0];

formRemove.addEventListener('submit', (e) => {
    const radioValue = document.querySelector(".remove-yes");
    e.preventDefault();
    if (radioValue.checked === true) {
        localStorage.clear();
        cleanDisplay();
        displayBooks();
    }
    modalRemove.style.display = "none";
})