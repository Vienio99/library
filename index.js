// List for user's book

let myLibrary = [];

// Form

let form = document.forms[0];

// Book constructor

function Book(id, author, title, pages, status) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
}

// Examples 
// function addExamples() {
//     let book = new Book(1, 'J. R. R. Tolkien', 'Lord Of The Rings', '564', 'Read');
//     let book2 = new Book(2, 'J. K. Rowling', 'Harry Potter', '752', 'Not read');
//     let book3 = new Book(3, 'J. K. Rowling', 'Harry Potter', '752', 'Not read');
//     let book4 = new Book(4, 'J. K. Rowling', 'Harry Potter', '752', 'Not read');
//     myLibrary.push(book);
//     myLibrary.push(book2);
//     myLibrary.push(book3);
//     myLibrary.push(book4);
// }

// addExamples();

// Helper functions



form.addEventListener('submit', () => {
    addBookToLocalLibrary();
    modal.style.display = "none";
})

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

function addBookToLocalLibrary() {
    let newBook = getBookFromInput();
    storeBookLocal(newBook);   
    cleanDisplay();
    displayBooks();
  }


function storeBookLocal(book) {
    localStorage.setItem(book.id, JSON.stringify(book));    
}

function addLocalStorageForDisplay() {
    let lastBookId = JSON.parse(localStorage.getItem('lastId'));
    for (let i = 1; i < lastBookId + 1; i++) {
        console.log(i)
        if (localStorage.getItem(i)) {
            let parsedBook = JSON.parse(localStorage.getItem(i));
            myLibrary.push(parsedBook);
        }
    }
}



console.log(localStorage)

const books = document.querySelector('.books');
function displayBooks() {
    myLibrary = [];
    addLocalStorageForDisplay();
    for (let i = 0; i < myLibrary.length; i++) {
        let id = myLibrary[i].id;
        createBookContainer(id);
    }
}

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

const newBook = document.querySelector('#new-book svg')
const modal = document.querySelector(".modal")
const closeBtn = document.querySelector(".close-btn")

newBook.addEventListener('click', () => {
    form.reset();
    modal.style.display = "block";
})


closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
    console.log(invalidInput.checkValidity())
})


window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
})

const bookContainers = document.querySelector('.books')

bookContainers.addEventListener('click', (e) => {
    if (e.target && e.target.className === 'edit-status') {
        let bookId = e.target.parentNode.parentNode.parentNode.id;
        let book = myLibrary.find(book => book.id === Number(bookId))
        if (book.status === 'Read') {
            book.status = 'Not read';
            e.target.textContent = book.status;
        } else {
            book.status = 'Read';
            e.target.textContent = book.status;
    }}
})


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
